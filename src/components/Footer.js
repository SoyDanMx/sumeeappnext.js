// src/components/Footer.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShieldAlt, FaLock, FaBook, FaInfoCircle, FaFileAlt, FaStar } from "react-icons/fa"; // Agregar FaStar

export default function Footer() {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showNotification("Email inválido / Invalid email", "error");
      return;
    }
    try {
      showNotification("¡Gracias por suscribirte! / Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      showNotification("Error en la suscripción / Subscription error", "error");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="SUMEE Logo"
                width={160}
                height={40}
                className="max-h-10 w-auto mb-6"
              />
            </Link>
            <p className="text-gray-400">The One-Click Technical Support</p>
            <p className="text-gray-400 mt-4">A Nuo Networks Company</p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Enlaces Rápidos / Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <FaInfoCircle className="text-primary" /> Sobre Nosotros / About Us
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <FaShieldAlt className="text-primary" /> Garantía / Guarantee
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <FaFileAlt className="text-primary" /> Términos / Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <FaLock className="text-primary" /> Privacidad / Privacy
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <FaBook className="text-primary" /> Código de Conducta / Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  <FaStar className="text-primary" /> Membresía / Membership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Recibe nuestras últimas noticias / Get our latest news
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border-none text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap cursor-pointer"
              >
                Suscribir / Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 Sumee. Todos los derechos reservados / All rights reserved.</p>
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
    </footer>
  );
}