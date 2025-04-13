// src/app/api/professionals/[id]/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const professional = await prisma.proCollaborator.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        profession: true,
        email: true,
        phone: true,
        area: true,
        photo: true,
        workPhotos: true,
        workedAreas: true,
        experience: true,
        ratings: {
          select: {
            value: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!professional) {
      return new Response(JSON.stringify({ error: 'Professional not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const averageRating =
      professional.ratings.length > 0
        ? professional.ratings.reduce((sum, rating) => sum + rating.value, 0) / professional.ratings.length
        : 0;

    const professionalWithAverageRating = {
      ...professional,
      averageRating: parseFloat(averageRating.toFixed(1)),
    };

    return new Response(JSON.stringify(professionalWithAverageRating), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching professional:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch professional' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}