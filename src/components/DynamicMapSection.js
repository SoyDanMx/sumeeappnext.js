// src/components/DynamicMapSection.js
"use client";

import dynamic from 'next/dynamic';

// Importar MapSection dinámicamente con SSR desactivado
const MapSection = dynamic(() => import('./MapSection'), {
  ssr: false, // Desactiva SSR para este componente
});

export default function DynamicMapSection() {
  return <MapSection />;
}