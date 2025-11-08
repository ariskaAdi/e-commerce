import { PrismaClient } from "../../prisma/generated/prisma/client";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "warn"],
});
