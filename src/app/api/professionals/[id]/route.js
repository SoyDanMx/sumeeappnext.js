// src/app/api/professionals/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Validación de ID
const isValidId = (id) => {
  const numId = parseInt(id);
  return !isNaN(numId) && numId > 0;
};

export async function GET(request, { params }) {
  const { id } = params;

  // Validar ID antes de procesar
  if (!isValidId(id)) {
    return NextResponse.json(
      { error: 'ID de profesional no válido' },
      { status: 400 }
    );
  }

  try {
    // Campos seleccionados para optimizar la consulta
    const selectFields = {
      id: true,
      name: true,
      profession: true,
      phone: true,
      area: true,
      photo: true,
      workPhotos: true,
      workedAreas: true,
      experience: true,
      reviews: {
        select: {
          value: true,
          comment: true,
          createdAt: true,
          user: { select: { name: true } },
        },
      },
      bio: true,
      services: true,
      createdAt: true
    };

    const professional = await prisma.proCollaborator.findUnique({
      where: { id: parseInt(id) },
      select: selectFields,
    });

    if (!professional) {
      return NextResponse.json(
        { error: 'Profesional no encontrado' },
        { status: 404 }
      );
    }

    // Calcular rating promedio
    const averageRating = professional.reviews.length > 0
      ? professional.reviews.reduce((sum, review) => sum + review.value, 0) / professional.reviews.length
      : 0;

    // Formatear respuesta
    const responseData = {
      ...professional,
      averageRating: parseFloat(averageRating.toFixed(1)),
      // Considera omitir datos sensibles como email
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Error al obtener profesional:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}