// src/app/membership/confirmation/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Confirmation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
          throw new Error('Parámetro de pago no encontrado / Payment parameter not found');
        }

        const response = await fetch('/api/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al confirmar el pago / Error confirming payment');
        }

        if (data.status === 'paid') {
          setSuccess('¡Pago confirmado! Tu membership está activo. / Payment confirmed! Your membership is active.');
          setTimeout(() => router.push('/professionals'), 2000);
        } else {
          throw new Error('El pago no fue exitoso. Intenta de nuevo. / Payment was not successful. Please try again.');
        }
      } catch (err) {
        setError(err.message);
        setTimeout(() => router.push('/membership'), 2000);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, router]);

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-8">Confirmación de Pago / Payment Confirmation</h1>
        {loading && <p className="text-lg">Procesando... / Processing...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
      </div>
    </section>
  );
}