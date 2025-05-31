import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

// Extend the global type to include prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// In production, it's best to not use a global variable
const prisma = globalForPrisma.prisma || new PrismaClient();

// If we're not in production, add to the global object for connection reuse
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;