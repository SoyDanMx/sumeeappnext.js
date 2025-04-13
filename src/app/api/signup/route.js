// src/app/api/signup/route.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();

    // Hashear la contraseña antes de guardarla
    const saltRounds = 10; // Número de rondas de hasheo (mayor = más seguro, pero más lento)
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Crear un nuevo usuario con la contraseña hasheada
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword, // Guardamos el hash, no la contraseña original
      },
    });

    return new Response(JSON.stringify({ message: 'User registered successfully', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === 'P2002') { // Error de unicidad (email ya existe)
      return new Response(JSON.stringify({ error: 'El correo ya está registrado / Email already registered' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Failed to register user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}