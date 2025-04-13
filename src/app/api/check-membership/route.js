// src/app/api/check-membership/route.js
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'tu-clave-secreta-muy-segura';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const membership = await prisma.membership.findFirst({
      where: {
        userId: userId,
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
    });

    return new Response(JSON.stringify({ hasMembership: !!membership }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error checking membership:', error);
    return new Response(JSON.stringify({ error: 'Failed to check membership' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}