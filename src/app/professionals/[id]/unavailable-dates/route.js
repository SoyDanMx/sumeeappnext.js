// src/app/api/professionals/[id]/unavailable-dates/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const bookings = await prisma.booking.findMany({
      where: { professionalId: parseInt(params.id) },
      select: { date: true },
    });
    const dates = bookings.map((b) => b.date.toISOString().split("T")[0]);
    return new Response(JSON.stringify({ dates }), { status: 200 });
  } catch (error) {
    console.error("Error al obtener fechas no disponibles:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}