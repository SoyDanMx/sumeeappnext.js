// src/app/api/create-checkout-session/route.js
import { verifyToken } from '../../../utils/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    // Crear una sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: 'Membership Básico / Basic Membership',
            },
            unit_amount: 50000, // $500 MXN (Stripe usa centavos, así que 500 MXN = 50000 centavos)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/membership/confirmation?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/membership',
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return new Response(
      JSON.stringify({ error: 'Error al iniciar el pago / Error initiating payment', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}