// src/components/TechnicianBanner.js
'use client';

import Image from 'next/image';
import { toast } from 'react-hot-toast'; // Opcional, asegúrate de instalarlo

export default function TechnicianBanner({ professional }) {
  const handleSearch = () => {
    if (typeof toast !== 'undefined') {
      toast.success('Buscando técnicos...');
    }
    console.log('Búsqueda iniciada');
  };

  // Verificación para evitar el error si professional es undefined
  const professionalName = professional?.name || 'Técnico Profesional';

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-left">
          <h1 className="text-4xl font-bold mb-6">Encuentra técnicos verificados en minutos</h1>
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="¿Qué servicio necesitas?"
              className="w-full max-w-md px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 transition-colors"
            >
              Buscar
            </button>
          </div>
          <div className="flex space-x-6 text-sm">
            <span className="flex items-center"><span className="mr-2">✔</span> Garantía de Satisfacción</span>
            <span className="flex items-center"><span className="mr-2">✔</span> Verificación de Identidad</span>
            <span className="flex items-center"><span className="mr-2">⭐</span> 4.8/5 (2,500+ reseñas)</span>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative w-full h-64 lg:h-96">
            <Image
              src="/images/technician-banner.jpg"
              alt={`Banner de ${professionalName}`}
              fill
              className="object-cover rounded-lg"
              priority
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Imagen no encontrada');
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}