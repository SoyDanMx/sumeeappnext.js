// lib/prisma.js
import { PrismaClient } from '@prisma/client';

// Usar globalThis para compatibilidad en diferentes entornos (Node.js, Next.js, etc.)
const globalThisForPrisma = globalThis;

// Inicializar PrismaClient, reutilizando la instancia si ya existe
const prisma = globalThisForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  // Almacenar la instancia en globalThis solo en desarrollo para evitar múltiples instancias
  globalThisForPrisma.prisma = prisma;
} else if (!globalThisForPrisma.prisma) {
  // En producción, inicializar si no existe para evitar duplicados
  globalThisForPrisma.prisma = prisma;
}

export default prisma;