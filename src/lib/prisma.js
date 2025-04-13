import { PrismaClient } from '@prisma/client';

// Evitar múltiples instancias de PrismaClient en desarrollo
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;