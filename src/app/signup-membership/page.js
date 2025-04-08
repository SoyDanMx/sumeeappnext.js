// src/app/signup-membership/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupMembership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [notification, setNotification] = useState(null);
  const [redirectToPayment, setRedirectToPayment] = useState(false);

  const mercadoPagoPaymentLink = "https://mpago.la/2EB373s"; // Enlace real proporcionado

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email) {
      setNotification({ message: "Por favor completa todos los campos / Please fill in all fields", type: "error" });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setNotification({ message: "Correo electrónico inválido / Invalid email", type: "error" });
      return;
    }

    // Simulación de registro (en un caso real, aquí guardarías los datos del usuario en una base de datos)
    try {
      setNotification({ message: "Registro exitoso. Serás redirigido a Mercado Pago para completar el pago. / Registration successful. You will be redirected to Mercado Pago to complete the payment.", type: "success" });
      setRedirectToPayment(true);
    } catch (error) {
      setNotification({ message: "Error al procesar el registro / Error processing registration", type: "error" });
    }
  };

  // Redirigir automáticamente a Mercado Pago después de 3 segundos si el registro es exitoso
  if (redirectToPayment) {
    setTimeout(() => {
      window.location.href = mercadoPagoPaymentLink;
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Regístrate en la Membresía Sumee / Join Sumee Membership
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            Completa el formulario para unirte a la Membresía Sumee por solo $19.99 al año. Serás redirigido a Mercado Pago para completar el pago.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Nombre / Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre / Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Correo Electrónico / Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@correo.com / your@email.com"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors"
              >
                Continuar con Mercado Pago / Proceed with Mercado Pago
              </button>
            </div>
          </form>
          <p className="text-gray-600 mt-6 text-center">
            ¿Ya eres miembro?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Inicia sesión aquí / Log in here
            </Link>
          </p>
        </div>
      </div>
      {notification && (
        <div className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg z-50">
          <div
            className={`p-4 ${
              notification.type === "error" ? "bg-red-100" : "bg-green-100"
            } rounded-lg flex justify-between items-center`}
          >
            <p
              className={`${
                notification.type === "error" ? "text-red-800" : "text-green-800"
              }`}
            >
              {notification.message}
            </p>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}