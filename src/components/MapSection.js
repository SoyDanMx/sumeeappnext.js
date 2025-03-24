"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Carga dinámica de MapComponent para evitar problemas con SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

export default function MapSection() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Lista de técnicos (igual que en el proyecto original)
  const technicians = [
    { id: 1, name: "Carlos Rodríguez", lat: 19.4326, lng: -99.1332, category: "Electricistas" },
    { id: 2, name: "Ana María López", lat: 19.4286, lng: -99.1277, category: "Plomeros" },
    { id: 3, name: "Juan Martínez", lat: 19.4356, lng: -99.1400, category: "Redes WiFi" },
    { id: 4, name: "Sofia García", lat: 19.4300, lng: -99.1350, category: "CCTV y Alarmas" },
    { id: 5, name: "Miguel Hernández", lat: 19.4270, lng: -99.1320, category: "Aire Acondicionado" },
  ];

  // Lista de categorías para los filtros (igual que en el proyecto original)
  const categories = [
    "Electricistas", "Plomeros", "Redes WiFi", "CCTV y Alarmas", "Aire Acondicionado",
    "Pintores", "Limpieza", "Fumigación", "Jardinería", "Carpintería",
    "Arquitectura y Construcción", "Tablaroca",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Técnicos disponibles cerca de ti / Pros near you
        </h2>
        <div className="flex gap-8">
          <div className="w-[70%] h-[600px] rounded-lg overflow-hidden relative">
            <MapComponent technicians={technicians} selectedCategories={selectedCategories} />
          </div>
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Filtrar por categoría / Filter by category</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-4">
                {categories.map((category, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category} / {category.split(' / ')[1] || category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}