import { Resend } from "resend";
import logger from "./logger.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SendEmailOptions {
  email: string;
  username: string;
  token: string;
  type?: "verification" | "reset" | "welcome";
}

export const sendVerificationEmail = async ({
  email,
  username,
  token,
  type = "verification",
}: SendEmailOptions) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const verificationLink = `${frontendUrl}/verify?token=${token}&email=${email}`;
    const resetLink = `${frontendUrl}/reset-password?token=${token}&email=${email}`;

    if (!process.env.RESEND_API_KEY) {
      logger.error("❌ RESEND_API_KEY not set in .env file");
      if (process.env.NODE_ENV !== "production") {
        console.log("\n⚠️  RESEND API KEY MISSING - FALLBACK LOG ⚠️");
        console.log(`To: ${email}`);
        console.log(`Type: ${type}`);
        console.log(`Link: ${type === "reset" ? resetLink : verificationLink}`);
        console.log("-----------------------------------------------\n");
        return true;
      }
      return false;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const isReset = type === "reset";
    const isWelcome = type === "welcome";

    const subject = isWelcome
      ? "Welcome to OneGrowth!"
      : isReset
        ? "Reset your password - One Growth"
        : "Verify your account - One Growth";

    const bannerTitle = isWelcome
      ? "Welcome to OneGrowth!"
      : isReset
        ? "Reset Your Password"
        : "Verify Your Account!";

    const message = isWelcome
      ? "Your account has been successfully created. You can now access the platform and begin using tools designed to help you think clearly, stay consistent and make meaningful progress."
      : isReset
        ? "We received a request to reset your password. If this was you, please proceed and complete your reset."
        : "Thanks for registering with OneGrowth! To complete your registration, please verify your email address below.";

    const actionLabel = isWelcome
      ? "Go to Dashboard"
      : isReset
        ? "Reset Password"
        : "Verify Email";

    const actionUrl = isWelcome
      ? frontendUrl
      : isReset
        ? resetLink
        : verificationLink;

    const actionDescription = isWelcome
      ? "access your dashboard"
      : isReset
        ? "complete your password reset"
        : "confirm your email and activate your account";

    const ejsData = {
      username,
      bannerTitle,
      message,
      actionLabel,
      actionUrl,
      actionDescription,
    };

    // Correct path relative to this file
    const templatePath = path.join(
      __dirname,
      "../templates/emails/email-template.ejs",
    );
    const htmlContent = await ejs.renderFile(templatePath, ejsData);

    const { data, error } = await resend.emails.send({
      from: "One Growth <onboarding@resend.dev>",
      to: email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      logger.error({ err: error, email }, "❌ Failed to send email via Resend");
      return false;
    }

    logger.info(
      { email, id: data?.id },
      "✅ Verification email sent successfully",
    );
    return true;
  } catch (error: any) {
    logger.error(
      { err: error, type, email },
      "❌ Failed to send email via Resend",
    );
    return false;
  }
};

export const sendOTP = sendVerificationEmail as any;
