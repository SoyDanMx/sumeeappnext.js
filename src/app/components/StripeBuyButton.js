// src/components/StripeBuyButton.js
"use client";

import { useEffect } from 'react';

export default function StripeBuyButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="stripe-button-container">
      <stripe-buy-button
        buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8EI6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"}
      />
    </div>
  );
}