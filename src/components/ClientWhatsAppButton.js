// src/components/ClientWhatsAppButton.js
"use client";

import dynamic from 'next/dynamic';

// Carga diferida de WhatsAppButton
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), {
  ssr: false, // Desactiva el renderizado en el servidor
});

export default function ClientWhatsAppButton() {
  return <WhatsAppButton />;
}