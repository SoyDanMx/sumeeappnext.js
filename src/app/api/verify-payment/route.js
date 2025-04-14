// src/app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Verifica el pago con Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    // Aquí puedes guardar en tu base de datos si es necesario
    // Ejemplo con Prisma:
    /*
    await prisma.payment.update({
      where: { sessionId },
      data: { status: paymentIntent.status }
    });
    */

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      customer: session.customer_details
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}