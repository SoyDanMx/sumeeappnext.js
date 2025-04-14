"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
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
        const paymentId = searchParams.get('payment_id');
        if (!paymentId) throw new Error('Missing payment ID');
        
        // Lógica para verificar pago con MercadoPago
        const response = await fetch(`/api/verify-mercadopago?payment_id=${paymentId}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Payment verification failed');
        
        setPaymentStatus(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {paymentStatus === 'approved' ? (
        <div>Pago aprobado</div>
      ) : (
        <div>Pago pendiente</div>
      )}
    </div>
  );
}