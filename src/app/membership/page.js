// src/app/membership/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Membership() {
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleMembershipClick = async () => {
    try {
      const response = await fetch("/api/check-auth", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setError("Por favor inicia sesión para continuar.");
        router.push("/login");
        return;
      }
      setShowPayment(true);
    } catch (err) {
      setError("Error al verificar autenticación.");
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Únete a Nuestra Membresía</h1>
            <p className="mt-2 text-gray-600">
              Activa tu membresía premium para acceder a todos los beneficios exclusivos.
            </p>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={handleMembershipClick}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Unirse a Membresía
            </button>
          </div>

          {showPayment && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Completa tu membresía</h2>
                    <button
                      onClick={() => setShowPayment(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Cerrar</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <a
                      href="https://buy.stripe.com/aFacN53nocGg4tp7SVafS01" // Reemplaza con tu payment link real
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Pagar Membresía
                    </a>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowPayment(false)}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}