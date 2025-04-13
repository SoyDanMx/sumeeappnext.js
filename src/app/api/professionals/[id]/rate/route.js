// src/app/api/professionals/[id]/rate/route.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'tu-clave-secreta-muy-segura';

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const data = await request.json();
    const { value, comment } = data;

    // Verificar si el profesional existe
    const professional = await prisma.proCollaborator.findUnique({
      where: { id: parseInt(id) },
    });
    if (!professional) {
      return new Response(JSON.stringify({ error: 'Professional not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear la calificación
    await prisma.rating.create({
      data: {
        value: parseInt(value),
        comment: comment || null,
        userId: userId,
        proCollaboratorId: parseInt(id),
      },
    });

    return new Response(JSON.stringify({ message: 'Rating submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit rating' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}