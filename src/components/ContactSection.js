"use client";

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [notification, setNotification] = useState(null);

  // Inicializamos EmailJS al cargar el componente
  useEffect(() => {
    emailjs.init('uTEWIWOgwP7ziXaIA'); // Public Key
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Por favor completa los campos obligatorios / Please fill in the required fields', 'error');
      return;
    }

    // Validar el formato del correo electrónico
    if (!validateEmail(formData.email)) {
      showNotification('Por favor ingresa un correo electrónico válido / Please enter a valid email address', 'error');
      return;
    }

    // Configuración de EmailJS
    const serviceID = 'service_zvh9gmc'; // Service ID
    const templateID = 'template_bto0m05'; // Template ID

    // Mostrar los datos enviados para depuración
    const emailData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      title: 'Nuevo mensaje de contacto',
    };
    console.log('Datos enviados a EmailJS:', emailData);

    emailjs.send(serviceID, templateID, emailData)
      .then((response) => {
        console.log('Correo enviado con éxito:', response);
        console.log('Response status:', response.status);
        console.log('Response text:', response.text);
        showNotification('Mensaje enviado con éxito / Message sent successfully');
        setFormData({ name: '', email: '', phone: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        console.log('Error details:', error.text);
        console.log('Error status:', error.status);
        console.log('Error response:', error.response);
        console.log('Full error object:', JSON.stringify(error, null, 2));
        showNotification('Error al enviar el mensaje / Error sending message', 'error');
      });
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Registra tu Interes en la Plataforma  / Register your interes in the App
        </h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
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
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono / Phone (Opcional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu número de teléfono / Your phone number"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje / Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="5"
                placeholder="Escribe tu mensaje aquí / Write your message here"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors"
            >
              Enviar / Send
            </button>
          </form>
        </div>
        {notification && (
          <div className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg z-50">
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
              <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}