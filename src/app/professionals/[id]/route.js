// src/app/api/professionals/[id]/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const professional = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        name: true,
        bio: true,
        services: true,
        reviews: true,
        membershipStatus: true,
      },
    });
    if (!professional) {
      return new Response(JSON.stringify({ error: "Profesional no encontrado" }), { status: 404 });
    }
    return new Response(JSON.stringify(professional), { status: 200 });
  } catch (error) {
    console.error("Error al obtener profesional:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}