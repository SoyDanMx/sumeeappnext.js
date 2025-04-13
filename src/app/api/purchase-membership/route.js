// src/app/api/purchase-membership/route.js
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../utils/auth';
import MercadoPago from 'mercadopago';

const prisma = new PrismaClient();

// Configurar Mercado Pago creando una instancia
const mercadopago = new MercadoPago({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const { plan } = await request.json();
    const cookies = request.headers.get('cookie');

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

    const preference = {
      items: [
        {
          title: 'Membership Plan Básico',
          unit_price: 10,
          quantity: 1,
          currency_id: 'MXN',
        },
      ],
      back_urls: {
        success: 'http://localhost:3000/membership/confirmation',
        failure: 'http://localhost:3000/membership/confirmation',
        pending: 'http://localhost:3000/membership/confirmation',
      },
      auto_return: 'approved',
      metadata: {
        user_id: userId,
      },
    };

    const response = await mercadopago.preferences.create(preference);
    const paymentUrl = response.init_point;
    console.log('Enlace de pago generado:', paymentUrl);

    return new Response(JSON.stringify({ paymentUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to initiate payment', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    ); // Aquí está el problema: falta una llave de cierre '}'
  } // Falta esta llave para cerrar la función POST
} // Falta esta llave para cerrar el archivo