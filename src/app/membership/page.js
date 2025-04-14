"use client";

import { useState } from 'react';

export default function MembershipPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (plan) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123' }), // Reemplaza con el userId real
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar el pago');
      }

      if (data.preferenceId) {
        const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY);
        mp.checkout({
          preference: {
            id: data.preferenceId,
          },
          autoOpen: true,
        });
      }
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      setError(error.message);
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h1>Selecciona tu plan</h1>
      <button onClick={() => handlePayment('basic')}>
        Pagar con MercadoPago
      </button>
      {isProcessing && (
        <div className="processing-message">
          <p>
            Estamos procesando tu pago, ¡no te preocupes! Esto puede tomar unos
            minutos. Por favor, no cierres esta página.
          </p>
          <p>
            We are processing your payment, don&apos;t worry! This may take a few
            minutes. Please don&apos;t close this page.
          </p>
          <div className="spinner" />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
} 