// src/components/MapWrapper.js
"use client";

import dynamic from 'next/dynamic';

const MapComponent = dynamic(
  () => import('./MapComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-gray-200 animate-pulse rounded-xl">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-500">Cargando mapa...</span>
        </div>
      </div>
    )
  }
);

export default function MapWrapper() {
  return (
    <section className="my-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Nuestra Ubicación / Our Location
      </h2>
      <div className="max-w-6xl mx-auto border rounded-xl overflow-hidden shadow-xl">
        <MapComponent />
      </div>
    </section>
  );
}