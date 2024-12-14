import { PrismaClient } from "@prisma/client";

declare global {
  // Using const here to define the global prisma instance
  let prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
const client = globalThis.prisma || new PrismaClient();

// If running in production, assign the client to the global object (this prevents multiple instances of Prisma in production)
if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = client;
}

export default client;
