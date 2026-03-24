import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client"; // Use standard @prisma/client

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });

// Export a single Prisma client for the whole app
export const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"], // optional logging
});

// Optional: test connection
export const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  }
};
