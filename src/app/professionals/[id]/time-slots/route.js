// src/app/api/professionals/[id]/time-slots/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        professionalId: parseInt(params.id),
        date: new Date(date),
      },
      select: { time: true },
    });
    const allSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
    const bookedSlots = bookings.map((b) => b.time);
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
    return new Response(JSON.stringify({ slots: availableSlots }), { status: 200 });
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}