// src/app/api/professionals/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

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
        reviews: { // Cambiado de 'ratings' a 'reviews'
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
      const reviews = pro.reviews || []; // Asegura que reviews sea un array, incluso si está vacío
      const averageRating =
        reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.value, 0) / reviews.length
          : 0;
      return { ...pro, averageRating: parseFloat(averageRating.toFixed(1)) };
    });

    return NextResponse.json(professionalsWithAverageRating, { status: 200 });
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return NextResponse.json({ error: 'Failed to fetch professionals' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, profession, area, phone, photo, workPhotos, workedAreas, experience } = data;

    if (!name || !email || !profession || !area) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, profession, and area are required' },
        { status: 400 }
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
            : [],
        },
        workedAreas: {
          create: workedAreas && Array.isArray(workedAreas)
            ? workedAreas.map(name => ({ name }))
            : [],
        },
      },
    });

    return NextResponse.json(newProfessional, { status: 201 });
  } catch (error) {
    console.error('Error creating professional:', error);

    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Failed to save collaborator', details: error.message },
      { status: 500 }
    );
  }
}