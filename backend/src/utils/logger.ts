import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

// Create logger with appropriate transport for environment
const logger = isDevelopment
  ? pino({
      level: process.env.LOG_LEVEL || "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    })
  : pino({
      level: process.env.LOG_LEVEL || "info",
    });

export default logger;
