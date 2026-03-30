import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";

import authRoutes from "./routes/auth.js";
import { protect } from "./middlewares/authMiddleware.js";
import logger from "./utils/logger.js";
import { testConnection } from "../lib/prisma.js";
import { successResponse, errorResponse } from "./utils/apiResponse.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://onegrowth.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

// HTTP request logging
app.use(
  pinoHttp({
    logger,
    autoLogging: true, // Log all requests automatically
  }),
);

// Health check / Root route
app.get("/", (req, res) => {
  res.json(successResponse({ status: "healthy" }, "API is running 🚀"));
});

app.use("/auth", authRoutes);

app.get("/profile", protect, (req, res) => {
  res.json(successResponse({ user: req.user }, "Profile retrieved"));
});

// 404 handler - Route not found
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json(
      errorResponse(`Route ${req.method} ${req.originalUrl} not found`, 404),
    );
});

// Global error handler - Catches unexpected errors
app.use((err: Error, req: Request, res: Response, _next: Function) => {
  logger.error({ err, path: req.originalUrl }, "Unhandled error");
  res.status(500).json(errorResponse("Internal server error", 500));
});

app.listen(PORT, async () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
  await testConnection();
});
