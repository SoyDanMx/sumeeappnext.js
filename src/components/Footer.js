"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      showNotification('Email inválido / Invalid email', 'error');
      return;
    }
    try {
      showNotification('¡Gracias por suscribirte! / Thanks for subscribing!');
      setEmail('');
    } catch (error) {
      showNotification('Error en la suscripción / Subscription error', 'error');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="font-['Pacifico'] text-3xl text-white mb-6 block">
              Sumee
            </Link>
            <p className="text-gray-400">The One-Click Technical Support</p>
            <p className="text-gray-400 mt-4">A Nuo Networks Company</p>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Enlaces Rápidos / Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white">Sobre Nosotros / About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Garantía / Guarantee</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Términos / Terms</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Privacidad / Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Recibe nuestras últimas noticias / Get our latest news</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border-none text-white"
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
      <a
        href="https://wa.me/525515118907?text=Deseo%20informacion%20sobre%20los%20Servicios"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-xl hover:bg-green-600 transition-all flex items-center gap-2 z-50"
      >
        <i className="ri-whatsapp-line text-2xl"></i>
        <span className="hidden sm:block">Deseo información</span>
      </a>
    </footer>
  );
}