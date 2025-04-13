// src/components/ClientContactSection.js
"use client";

import dynamic from 'next/dynamic';

// Carga diferida de ContactSection
const ContactSection = dynamic(() => import('./ContactSection'), {
  ssr: false, // Desactiva el renderizado en el servidor
});

export default function ClientContactSection() {
  return <ContactSection />;
}