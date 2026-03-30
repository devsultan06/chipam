import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { errorResponse } from "../utils/apiResponse.js";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json(errorResponse("No token provided", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    logger.warn({ err }, "Invalid token attempt");
    res.status(401).json(errorResponse("Invalid token", 401));
  }
};

