// src/app/api/confirm-payment/route.js
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../utils/auth';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();
    console.log('Datos recibidos:', { sessionId });

    const cookies = request.headers.get('cookie');
    console.log('Cookies:', cookies);

    const token = cookies
      ?.split('; ')
      ?.find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return new Response(JSON.stringify({ error: 'No autorizado: Token no proporcionado / Unauthorized: Token not provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Token inválido / Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userId = decoded.userId;
    console.log('Usuario autenticado, userId:', userId);

    // Verificar el estado del pago con Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Estado del pago según Stripe:', session);

    if (session.payment_status === 'paid') {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await prisma.membership.upsert({
        where: { userId },
        update: {
          active: true,
          expiresAt,
        },
        create: {
          userId,
          active: true,
          expiresAt,
          createdAt: new Date(),
        },
      });
      console.log('Membership actualizado para userId:', userId);
    }

    return new Response(JSON.stringify({ message: 'Payment processed successfully', status: session.payment_status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to confirm payment', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}