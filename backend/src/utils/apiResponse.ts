import { randomUUID } from "crypto";

// API Response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | undefined;
  meta?: {
    timestamp?: string;
    version?: string;
  };
  requestId?: string;
  status?: number | undefined;
}

// Helper function to create success response
export const successResponse = <T>(
  data: T,
  message?: string,
): ApiResponse<T> => ({
  success: true,
  data,
  message,
  meta: {
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  },
  requestId: randomUUID(),
});

// Helper function to create error response
export const errorResponse = (
  message: string,
  status?: number,
): ApiResponse<null> => ({
  success: false,
  data: null,
  message,
  meta: {
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  },
  requestId: randomUUID(),
  status,
});
