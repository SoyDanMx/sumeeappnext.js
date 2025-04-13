// src/app/membership/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

// Carga la clave pública de Stripe desde las variables de entorno
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Membership() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Verificando autenticación...');
        const response = await fetch('/api/check-auth', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          console.log('Error en autenticación:', data.error);
          setError('Debes iniciar sesión para comprar un membership. / You must log in to purchase a membership.');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }

        console.log('Usuario autenticado correctamente');
        setIsAuthenticated(true);
      } catch (err) {
        console.log('Error al verificar autenticación:', err.message);
        setError('Error al verificar autenticación / Error checking authentication');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    checkAuth();
  }, [router]);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Hacer una solicitud al backend para crear una sesión de Stripe Checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: 'basic' }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar el pago / Error initiating payment');
      }

      // Redirigir al usuario a la página de Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log('Estado actual:', JSON.stringify({ isAuthenticated, error, success, loading }, null, 2));

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Comprar Membership / Purchase Membership
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg mb-4">
            Obtén un membership para acceder a la lista de profesionales y sus detalles. / Get a membership to access the list of professionals and their details.
          </p>
          <p className="text-gray-600 mb-4">
            Plan Básico: $500/mes / Basic Plan: $500/month
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {isAuthenticated && !error && !success ? (
            <div className="text-center">
              <button
                onClick={handlePurchase}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                {loading ? 'Procesando... / Processing...' : 'Pagar con Stripe / Pay with Stripe'}
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Autenticando... / Authenticating...
            </p>
          )}
          {loading && <p className="text-center">Cargando... / Loading...</p>}
        </div>
      </div>
    </section>
  );
}