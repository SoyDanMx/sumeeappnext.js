// src/components/StripeBuyButton.js
"use client";

import { useEffect } from 'react';

export default function StripeBuyButton() {
  useEffect(() => {
    // Verificar si el script ya está cargado
    if (document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      return;
    }

    // Cargar el script de Stripe
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    script.onload = () => console.log('Stripe Buy Button script loaded successfully');
    script.onerror = (e) => console.error('Stripe Buy Button script failed to load', e);

    document.body.appendChild(script);

    return () => {
      // Limpieza al desmontar el componente
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="stripe-buy-button-container my-4">
      <stripe-buy-button
        buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
        publishable-key="pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8EI6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"
      />
    </div>
  );
}