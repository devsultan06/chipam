/**
 * Pino Logger Demo - Run this to see what the logger can do!
 *
 * Run with: npx tsx src/utils/logger-demo.ts
 */

import logger from "./logger.js";

console.log("\n🔵 === PINO LOGGER DEMO ===\n");

// ============================================
// 1. LOG LEVELS (from most to least severe)
// ============================================
console.log("--- 1. LOG LEVELS ---\n");

logger.fatal("FATAL: System is crashing! 💀"); // Level 60 - app is unusable
logger.error("ERROR: Something broke! ❌"); // Level 50 - error occurred
logger.warn("WARN: This might be a problem ⚠️"); // Level 40 - warning
logger.info("INFO: Server started on port 3000"); // Level 30 - normal info
logger.debug("DEBUG: User object: {id: 1}"); // Level 20 - debug details
logger.trace("TRACE: Entering function xyz()"); // Level 10 - very verbose

// ============================================
// 2. STRUCTURED LOGGING (add context objects)
// ============================================
console.log("\n--- 2. STRUCTURED LOGGING ---\n");

// You can pass an object as the first argument
logger.info({ userId: 123, action: "login" }, "User logged in");

logger.error(
  {
    endpoint: "/api/users",
    method: "POST",
    statusCode: 500,
    duration: "245ms",
  },
  "Request failed",
);

// ============================================
// 3. LOGGING ERRORS (with stack traces)
// ============================================
console.log("\n--- 3. ERROR LOGGING ---\n");

try {
  throw new Error("Database connection failed!");
} catch (err) {
  logger.error({ err }, "Caught an error"); // Pass error in object
}

// ============================================
// 4. CHILD LOGGERS (add persistent context)
// ============================================
console.log("\n--- 4. CHILD LOGGERS ---\n");

// Create a child logger with context that's included in every log
const requestLogger = logger.child({
  requestId: "abc-123",
  ip: "192.168.1.1",
});

requestLogger.info("Processing request...");
requestLogger.info("Fetching user data...");
requestLogger.info("Request complete!");
// All of these will include requestId and ip automatically!

// ============================================
// 5. TIMING / PERFORMANCE
// ============================================
console.log("\n--- 5. PERFORMANCE LOGGING ---\n");

const start = Date.now();

// Simulate some work
for (let i = 0; i < 1000000; i++) {}

const duration = Date.now() - start;
logger.info({ duration: `${duration}ms` }, "Heavy operation completed");

// ============================================
// 6. DIFFERENT LOG LEVELS IN PRODUCTION vs DEV
// ============================================
console.log("\n--- 6. ENVIRONMENT INFO ---\n");

logger.info(
  {
    nodeEnv: process.env.NODE_ENV || "development",
    logLevel: process.env.LOG_LEVEL || "info",
  },
  "Current environment settings",
);

console.log("\n🔵 === DEMO COMPLETE ===\n");
console.log("💡 TIP: Set LOG_LEVEL=debug to see debug messages");
console.log("💡 TIP: Set NODE_ENV=production to see JSON output\n");
