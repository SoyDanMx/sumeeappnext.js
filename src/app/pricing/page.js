// src/app/pricing/page.js
"use client";

import { useEffect, useState } from "react";

export default function Pricing() {
  const [mostrarPago, setMostrarPago] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Elige tu Membresía</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold">Básico</h2>
          <p className="text-lg">$10/mes</p>
          <ul className="my-4">
            <li>Acceso a servicios básicos</li>
            <li>Soporte por correo</li>
          </ul>
          <button
            onClick={() => setMostrarPago(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Seleccionar
          </button>
        </div>
        <div className="border p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold">Premium</h2>
          <p className="text-lg">$20/mes</p>
          <ul className="my-4">
            <li>Acceso completo</li>
            <li>Soporte prioritario</li>
          </ul>
          <button
            onClick={() => setMostrarPago(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Seleccionar
          </button>
        </div>
      </div>
      {mostrarPago && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <stripe-buy-button
              buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
              publishable-key="pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8Ei6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"
            ></stripe-buy-button>
            <button
              onClick={() => setMostrarPago(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}