import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("Checking Prisma Client models...");
console.log("prisma.user:", prisma.user ? "Defined" : "Undefined");
// @ts-ignore
console.log("prisma.users:", prisma.users ? "Defined" : "Undefined");
// @ts-ignore
console.log("prisma.User:", prisma.User ? "Defined" : "Undefined");

console.log("Keys on prisma instance:", Object.keys(prisma));
