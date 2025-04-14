// src/app/api/purchase-membership/route.js
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../utils/auth';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Validar variables de entorno
if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN no está definido');
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL no está definido');
}

// Configurar MercadoPago con el access token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});
const preference = new Preference(client);

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

    // Usar una URL base dinámica desde las variables de entorno
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const result = await preference.create({
      body: {
        items: [
          {
            title: 'Suscripción Anual - Membership Plan Básico',
            unit_price: 500, // Cambiar de 10 a 500 MXN
            quantity: 1,
            currency_id: 'MXN',
          },
        ],
        payer: {
          name: 'Comprador',
          surname: 'Ejemplo',
          email: 'comprador@ejemplo.com',
        },
        back_urls: {
          success: `${baseUrl}/membership/confirmation`,
          failure: `${baseUrl}/membership/confirmation`,
          pending: `${baseUrl}/membership/confirmation`,
        },
        auto_return: 'approved',
        metadata: {
          user_id: userId,
        },
        external_reference: userId,
        notification_url: `${baseUrl}/api/mercadopago-webhook`,
      },
    });

    const paymentUrl = result.init_point;
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
    );
  }
}