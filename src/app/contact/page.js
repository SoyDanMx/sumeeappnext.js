"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Inicializa EmailJS al montar el componente
  useEffect(() => {
    emailjs.init("uTEWIWOgwP7ziXaIA");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar el correo con el nuevo Service ID
    emailjs
      .send("service_08xf9xl", "template_bto0m05", {
        ...formData,
        title: "Nuevo mensaje de contacto",
      })
      .then(
        (response) => {
          console.log("Correo enviado con éxito:", response);
          setStatus("Mensaje enviado con éxito. ¡Te responderemos pronto!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Error al enviar el mensaje. Por favor, intenta de nuevo.");
          console.error("Error de EmailJS:", error);
          console.error("Status:", error.status);
          console.error("Texto del error:", error.text);
        }
      );
  };

  return (
    <main>
      <Header />
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Contacto / Contact</h1>
          <div className="max-w-lg mx-auto">
            <p className="text-gray-600 mb-8">
              ¿Tienes alguna pregunta o necesitas ayuda? Envíanos un mensaje y te responderemos lo antes posible.
            </p>
            {status && (
              <p
                className={`mb-6 text-center ${
                  status.includes("éxito") ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre / Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="Tu nombre / Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico / Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="tu@correo.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje / Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  placeholder="Escribe tu mensaje aquí / Write your message here"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300"
              >
                Enviar / Send
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}