"use client";

import { useState } from 'react';

export default function HeroSection() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!service || !location) {
      showNotification('Por favor complete todos los campos / Please fill all fields', 'error');
      return;
    }
    try {
      // Simulación de búsqueda (ya que la API es mock)
      showNotification('Búsqueda exitosa / Search successful');
    } catch (error) {
      showNotification('Error en la búsqueda / Search error', 'error');
    }
  };

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <h1 className="text-5xl font-bold text-center mb-6 max-w-4xl mx-auto">
          Encuentra profesionales cerca de ti en segundos / Connect with professionals near you in seconds
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Conectamos expertos certificados con personas que necesitan servicios técnicos de calidad / We connect certified experts with people who need quality technical services
        </p>
        <form onSubmit={handleSearch} className="flex gap-4 max-w-3xl mx-auto bg-white p-2 rounded-lg shadow-lg">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400"></i>
            </div>
            <input
              type="search"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="search-input w-full pl-10 pr-4 py-3 rounded-lg border-none text-sm"
              placeholder="¿Qué servicio necesitas? / What service do you need?"
            />
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <i className="ri-map-pin-line text-gray-400"></i>
            </div>
            <input
              type="search"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="search-input w-full pl-10 pr-4 py-3 rounded-lg border-none text-sm"
              placeholder="Tu ubicación / Your location"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap cursor-pointer"
          >
            Buscar / Search
          </button>
        </form>
        {notification && (
          <div className="fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg z-50">
            <div
              className={`p-4 ${
                notification.type === 'error' ? 'bg-red-100' : 'bg-green-100'
              } rounded-lg flex justify-between items-center`}
            >
              <p
                className={`${
                  notification.type === 'error' ? 'text-red-800' : 'text-green-800'
                }`}
              >
                {notification.message}
              </p>
              <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
                <i className="ri-close-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <img
        src="https://public.readdy.ai/ai/img_res/daf531bc736f3262dd83d37386a927d0.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
        alt="Background"
      />
    </section>
  );
}