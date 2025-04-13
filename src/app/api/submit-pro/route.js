// src/app/api/submit-pro/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Datos recibidos:', data); // Añadimos un log para depurar los datos recibidos

    // Validar datos de entrada
    const requiredFields = ['name', 'email', 'profession', 'area'];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missingFields.join(', ')}` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Asegurarnos de que workPhotos y workedAreas sean arrays (o null si no están presentes)
    const workPhotos = Array.isArray(data.workPhotos) ? data.workPhotos : [];
    const workedAreas = Array.isArray(data.workedAreas) ? data.workedAreas : [];

    const collaborator = await prisma.proCollaborator.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        profession: data.profession,
        message: data.message || null,
        area: data.area,
        photo: data.photo || null,
        workPhotos, // Prisma lo convertirá a JSON
        workedAreas, // Prisma lo convertirá a JSON
        experience: data.experience || null,
      },
    });

    return new Response(JSON.stringify({ message: 'Collaborator saved successfully', collaborator }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving collaborator:', error);
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({ error: 'El correo ya está registrado / Email already registered' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(
      JSON.stringify({
        error: 'Failed to save collaborator',
        details: error.message,
        code: error.code, // Añadimos el código de error de Prisma si existe
        meta: error.meta, // Añadimos metadatos del error si existen
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}