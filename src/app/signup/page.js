// src/app/signup/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email || !formData.password) {
      showNotification('Por favor completa todos los campos / Please fill in all fields', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
      showNotification('Por favor ingresa un correo electrónico válido / Please enter a valid email address', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showNotification('La contraseña debe tener al menos 6 caracteres / Password must be at least 6 characters', 'error');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification('Registro exitoso / Sign up successful');
        setFormData({ name: '', email: '', password: '' });
        setTimeout(() => router.push('/login'), 2000); // Redirige a /login después de 2 segundos
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || 'Error al registrarse / Error signing up', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al registrarse / Error signing up', 'error');
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Registrarse / Sign Up
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre / Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre / Your name"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico / Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@correo.com"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña / Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu contraseña / Your password"
                required
                aria-required="true"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors"
              aria-label="Registrarse en Sumee App"
            >
              Registrarse / Sign Up
            </button>
          </form>
        </div>

        {notification && (
          <div
            className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg z-50"
            role="alert"
            aria-live="assertive"
          >
            <div
              className={`p-4 ${
                notification.type === 'error' ? 'bg-red-100' : 'bg-green-100'
              } rounded-lg flex justify-between items-center`}
            >
              <p
                className={`${
                  notification.type === 'error' ? 'text-red-800' : 'text-green-800'
                }`}
              >
                {notification.message}
              </p>
              <button
                onClick={() => setNotification(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar notificación"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}