// src/app/api/professionals/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const professionals = await prisma.proCollaborator.findMany({
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

    const professionalsWithAverageRating = professionals.map((pro) => {
      const ratings = pro.ratings;
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length
          : 0;
      return { ...pro, averageRating: parseFloat(averageRating.toFixed(1)) };
    });

    return new Response(JSON.stringify(professionalsWithAverageRating), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch professionals' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, profession, area, phone, photo, workPhotos, workedAreas, experience } = data;

    if (!name || !email || !profession || !area) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, profession, and area are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newProfessional = await prisma.proCollaborator.create({
      data: {
        name,
        email,
        profession,
        area,
        phone: phone || null,
        photo: photo || null,
        experience: experience || null,
        workPhotos: {
          create: workPhotos && Array.isArray(workPhotos)
            ? workPhotos.map(url => ({ url }))
            : []
        },
        workedAreas: {
          create: workedAreas && Array.isArray(workedAreas)
            ? workedAreas.map(name => ({ name }))
            : []
        }
      },
    });

    return new Response(JSON.stringify(newProfessional), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating professional:', error);

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ error: 'Failed to save collaborator', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
