// src/app/membership/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Membership() {
  const [mostrarPago, setMostrarPago] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Cargar el script de Stripe
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  // Verificar autenticación (opcional, basado en el uso de verifyToken)
  const handleMembershipClick = async () => {
    try {
      const response = await fetch("/api/check-auth", {
        method: "GET",
        credentials: "include", // Enviar cookies con el token
      });
      if (!response.ok) {
        setError("Por favor inicia sesión para continuar.");
        router.push("/login");
        return;
      }
      setMostrarPago(true);
    } catch (err) {
      setError("Error al verificar autenticación.");
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Únete a Nuestra Membresía</h1>
      <p className="mb-6">Activa tu membresía para conectar con clientes.</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button
        onClick={handleMembershipClick}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Unirse a Membresía
      </button>
      {mostrarPago && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Pagar con Stripe</h2>
            <div className="stripe-container">
              <stripe-buy-button
                buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
                publishable-key="pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8Ei6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"
              ></stripe-buy-button>
            </div>
            <button
              onClick={() => setMostrarPago(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}