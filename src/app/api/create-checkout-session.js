// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import { getSession } from 'next-auth/react'; // Si usas NextAuth

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // 1. Verificar el método HTTP
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // 2. Obtener información del usuario (si está autenticado)
    const session = await getSession({ req });
    const userId = session?.user?.id || null;

    // 3. Crear la sesión de Checkout en Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // ID de tu precio en Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment/canceled`,
      metadata: {
        userId: userId, // Guardar referencia del usuario
      },
    });

    // 4. Retornar la sesión creada
    return res.status(200).json({ id: checkoutSession.id });

  } catch (err) {
    console.error('Error creating checkout session:', err);
    return res.status(500).json({ 
      error: {
        message: 'Error al crear la sesión de pago',
        details: err.message 
      }
    });
  }
}