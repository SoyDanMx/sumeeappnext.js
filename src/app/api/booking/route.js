// src/app/api/bookings/route.js
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../../utils/auth";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const cookies = req.headers.get("cookie");
    const token = cookies
      ?.split("; ")
      ?.find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Token inválido" }), { status: 401 });
    }

    const { professionalId, date, timeSlot } = await req.json();
    if (!professionalId || !date || !timeSlot) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    const professional = await prisma.user.findUnique({
      where: { id: parseInt(professionalId) },
      select: { membershipStatus: true },
    });

    if (!professional || professional.membershipStatus !== "active") {
      return new Response(JSON.stringify({ error: "Profesional no disponible" }), { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: decoded.userId,
        professionalId: parseInt(professionalId),
        date: new Date(date),
        time: timeSlot,
        status: "pending",
      },
    });

    return new Response(JSON.stringify({ booking }), { status: 201 });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}