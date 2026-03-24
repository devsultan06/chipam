import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import logger from "../utils/logger.js";
import { OtpType, Role } from "@prisma/client";

import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { sendVerificationEmail } from "../utils/email.js";
import crypto from "crypto";

// Helper functions
const createAccessToken = (id: number, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET!, { expiresIn: "15m" });

const createRefreshToken = (id: number) =>
  jwt.sign({ id }, process.env.REFRESH_SECRET!, { expiresIn: "7d" });

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json(errorResponse("User already exists", 400));
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        isVerified: false,
        role: Role.GUEST, // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        role: true,
      },
    });

    // Generate Token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create Verification Token
    await prisma.otpToken.create({
      data: {
        userId: user.id,
        code: token,
        type: OtpType.VERIFY_EMAIL,
        expiresAt: tokenExpiry,
      },
    });

    // Send Verification Email
    const emailSent = await sendVerificationEmail({
      email,
      username: name,
      token: token,
      type: "verification",
    });

    if (!emailSent) {
      // If email fails, delete the user (will cascade delete otpToken)
      await prisma.user.delete({ where: { id: user.id } });
      return res
        .status(500)
        .json(errorResponse("Failed to send verification email", 500));
    }

    // Generate tokens immediately after registration
    const accessToken = createAccessToken(user.id, user.role);
    const refreshToken = createRefreshToken(user.id);

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/auth/refresh",
    });

    res
      .status(201)
      .json(
        successResponse(
          { user, accessToken },
          "User registered. Please verify your email.",
        ),
      );
  } catch (error) {
    logger.error({ err: error, email: req.body.email }, "Register failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json(errorResponse("User not found", 400));
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json(errorResponse("Invalid credentials", 401));
    }

    // Generate tokens
    const accessToken = createAccessToken(user.id, user.role);
    const refreshToken = createRefreshToken(user.id);

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/auth/refresh",
    });

    res.json(
      successResponse({ accessToken, role: user.role }, "Login successful"),
    );
  } catch (error) {
    logger.error({ err: error, email: req.body.email }, "Login failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Refresh access token
export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json(errorResponse("No refresh token", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      id: number;
    };

    // Fetch user to get current role
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user)
      return res.status(401).json(errorResponse("User not found", 401));

    const accessToken = createAccessToken(user.id, user.role);
    res.json(successResponse({ accessToken }, "Token refreshed"));
  } catch {
    res.status(403).json(errorResponse("Invalid refresh token", 403));
  }
};

// Logout user
export const logout = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken", { path: "/auth/refresh" });
  res.json(successResponse(null, "Logged out successfully"));
};

// Verify Email with Token
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    if (user.isVerified) {
      return res.status(400).json(errorResponse("Email already verified", 400));
    }

    // Find valid Token
    const validToken = await prisma.otpToken.findFirst({
      where: {
        userId: user.id,
        code: token,
        type: OtpType.VERIFY_EMAIL,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!validToken) {
      return res
        .status(400)
        .json(errorResponse("Invalid or expired verification link", 400));
    }

    // Verify user and mark token used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      }),
      prisma.otpToken.update({
        where: { id: validToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    // Send Welcome Email
    await sendVerificationEmail({
      email: user.email,
      username: user.name,
      token: "", // not used for welcome
      type: "welcome",
    });

    res.json(successResponse(null, "Email verified successfully"));
  } catch (error) {
    logger.error({ err: error, email: req.body.email }, "Verification failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Resend Verification Link
export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    if (user.isVerified) {
      return res.status(400).json(errorResponse("Email already verified", 400));
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create new Token
    await prisma.otpToken.create({
      data: {
        userId: user.id,
        code: token,
        type: OtpType.VERIFY_EMAIL,
        expiresAt: tokenExpiry,
      },
    });

    const emailSent = await sendVerificationEmail({
      email,
      username: user.name,
      token: token,
      type: "verification",
    });

    if (!emailSent) {
      return res
        .status(500)
        .json(errorResponse("Failed to send verification email", 500));
    }

    const responseData: any = {};
    if (process.env.NODE_ENV !== "production") {
      responseData.devToken = token;
    }

    res.json(
      successResponse(responseData, "Verification link resent successfully"),
    );
  } catch (error) {
    logger.error({ err: error, email: req.body.email }, "Resend Token failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Forgot Password Link
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    // Create new Reset Token
    await prisma.otpToken.create({
      data: {
        userId: user.id,
        code: token,
        type: OtpType.RESET_PASSWORD,
        expiresAt: tokenExpiry,
      },
    });

    const emailSent = await sendVerificationEmail({
      email,
      username: user.name,
      token: token,
      type: "reset",
    });

    if (!emailSent) {
      return res
        .status(500)
        .json(errorResponse("Failed to send reset link", 500));
    }

    const responseData: any = {};
    if (process.env.NODE_ENV !== "production") {
      responseData.devToken = token;
    }

    res.json(
      successResponse(responseData, "Reset password link sent successfully"),
    );
  } catch (error) {
    logger.error(
      { err: error, email: req.body.email },
      "Forgot Password failed",
    );
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Verify Reset Link
export const verifyResetOTP = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    const validToken = await prisma.otpToken.findFirst({
      where: {
        userId: user.id,
        code: token,
        type: OtpType.RESET_PASSWORD,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!validToken) {
      return res
        .status(400)
        .json(errorResponse("Invalid or expired reset link", 400));
    }

    res.json(successResponse(null, "Reset link verified successfully"));
  } catch (error) {
    logger.error(
      { err: error, email: req.body.email },
      "Verify Reset Link failed",
    );
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Reset Password using Token
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token, newPassword } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    const validToken = await prisma.otpToken.findFirst({
      where: {
        userId: user.id,
        code: token,
        type: OtpType.RESET_PASSWORD,
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!validToken) {
      return res
        .status(400)
        .json(errorResponse("Invalid or expired reset link", 400));
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    // Update password and mark token used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
      }),
      prisma.otpToken.update({
        where: { id: validToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    res.json(successResponse(null, "Password reset successfully"));
  } catch (error) {
    logger.error(
      { err: error, email: req.body.email },
      "Reset Password failed",
    );
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Get current user profile
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json(errorResponse("User not found", 404));
    }

    res.json(successResponse(user, "User profile retrieved successfully"));
  } catch (error) {
    logger.error(
      { err: error, userId: (req as any).user?.id },
      "Get profile failed",
    );
    res.status(500).json(errorResponse("Server error", 500));
  }
};
