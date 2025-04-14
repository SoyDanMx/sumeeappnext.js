// src/app/membership/confirmation/page.js
"use client"; // Esto debe ser siempre la primera línea

import { Suspense, useState, useEffect } from 'react'; // Importa useState y useEffect aquí
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

// Componente principal envuelto en Suspense
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConfirmationContent />
    </Suspense>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        
        if (!sessionId) {
          throw new Error('No se encontró ID de sesión / Missing session ID');
        }

        // Inicializa Stripe
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        
        // Verifica el estado del pago con Stripe
        const { paymentIntent } = await stripe.retrievePaymentIntent(sessionId);

        if (!paymentIntent) {
          throw new Error('No se pudo verificar el pago');
        }

        setPaymentStatus(paymentIntent.status);
        
        // Opcional: Guarda en tu base de datos
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            sessionId,
            status: paymentIntent.status 
          }),
          credentials: 'include'
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Error al registrar pago');
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error de Pago / Payment Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/membership')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Volver a intentar / Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {paymentStatus === 'succeeded' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            ¡Pago Completado! / Payment Successful!
          </h2>
          <p className="text-green-600 mb-4">
            Tu membresía ha sido activada correctamente. / Your membership has been successfully activated.
          </p>
          <button
            onClick={() => router.push('/technicians')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Ver Profesionales / View Professionals
          </button>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">
            Pago Pendiente / Payment Pending
          </h2>
          <p className="text-yellow-600 mb-4">
            Estamos procesando tu pago. Esto puede tomar unos minutos. / We're processing your payment. This may take a few minutes.
          </p>
          <button
            onClick={() => router.refresh()}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Actualizar Estado / Refresh Status
          </button>
        </div>
      )}
    </div>
  );
}