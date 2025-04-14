"use client";

import { useState } from "react";

export default function MembershipPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (plan) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123" }), // Reemplaza con el userId real
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar el pago");
      }

      if (data.preferenceId) {
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
        );
        mp.checkout({
          preference: {
            id: data.preferenceId,
          },
          autoOpen: true,
        });
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      setError(error.message);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Selecciona tu plan</h1>
        <p className="text-gray-600 mb-10">Choose the plan that best suits your needs</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Plan Básico</h2>
            <p className="text-gray-500 mb-4">Acceso limitado a servicios</p>
            <button
              onClick={() => handlePayment("basic")}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
              disabled={isProcessing}
            >
              Pagar con MercadoPago
            </button>
          </div>
          {/* Agrega más planes si deseas */}
        </div>

        {isProcessing && (
          <div className="mt-10 text-center">
            <p className="text-gray-700 mb-2 animate-pulse">
              Estamos procesando tu pago, no cierres esta página...
            </p>
            <div className="w-8 h-8 mx-auto border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-600 font-medium">Error: {error}</p>
        )}
      </div>
    </div>
  );
}
