// src/app/login/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      showNotification('Por favor completa todos los campos / Please fill in all fields', 'error');
      return;
    }

    if (!validateEmail(formData.email)) {
      showNotification('Por favor ingresa un correo electrónico válido / Please enter a valid email address', 'error');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el JWT en una cookie
        Cookies.set('token', data.token, { expires: 1 / 24 }); // Expira en 1 hora (1/24 días)
        showNotification('Inicio de sesión exitoso / Login successful');
        setFormData({ email: '', password: '' });
        setTimeout(() => router.push('/'), 2000);
      } else {
        const errorData = await response.json();
        showNotification(errorData.error || 'Error al iniciar sesión / Error logging in', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al iniciar sesión / Error logging in', 'error');
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Iniciar Sesión / Log In
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              aria-label="Iniciar Sesión en Sumee App"
            >
              Iniciar Sesión / Log In
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