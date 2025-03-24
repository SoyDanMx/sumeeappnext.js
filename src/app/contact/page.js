// src/app/contact/page.js
"use client";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.init("uTEWIWOgwP7ziXaIA"); // Tu Public Key

    emailjs.sendForm(
      "service_08xf9xl",    // Tu Service ID
      "template_bto0m05",   // Tu Template ID
      form.current
    )
    .then(() => {
      alert('Mensaje enviado exitosamente!');
      form.current.reset(); // Limpia el formulario después del envío
    })
    .catch((error) => {
      alert('Error al enviar el mensaje: ' + error.text);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Nombre:</label>
          <input
            type="text"
            name="user_name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email:</label>
          <input
            type="email"
            name="user_email"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Mensaje:</label>
          <textarea
            name="message"
            className="w-full p-2 border rounded h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-medium"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}