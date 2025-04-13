// src/components/WhatsAppButton.js
'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/525515118907?text=¡Hola! Quiero más información sobre SUMEE App."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#25D366] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#20C35A] transition-all duration-300 animate-pulse"
      aria-label="Contactar por WhatsApp"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Deseo Informacion</span>
        <FaWhatsapp size={30} />
      </div>
    </a>
  );
};

export default WhatsAppButton;