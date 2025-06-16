// src/app/page.js
'use client';

import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ClientContactSection from '../components/ClientContactSection';
import Footer from '../components/Footer';
import Link from 'next/link';
import DynamicMapSection from '../components/DynamicMapSection';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section (Caja Azul con Imagen a la Derecha) */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
          {/* Contenido Inclinado a la Izquierda */}
          <div className="lg:w-1/2 text-left">
            <h1 className="text-4xl font-bold mb-6">
              Encuentra técnicos verificados en minutos
            </h1>
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="¿Qué servicio necesitas?"
                className="w-full max-w-md px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-2 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 transition-colors">
                Buscar
              </button>
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="flex items-center">
                <span className="mr-2">✔</span> Garantía de Satisfacción
              </span>
              <span className="flex items-center">
                <span className="mr-2">✔</span> Verificación de Identidad
              </span>
              <span className="flex items-center">
                <span className="mr-2">⭐</span> 4.8/5 (2,500+ reseñas)
              </span>
            </div>
          </div>

          {/* Imagen a la Derecha */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative w-full h-64 lg:h-96">
              <Image
                src="/images/technician-banner.jpg"
                alt="Técnico Profesional"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <ServicesSection />

      {/* Cómo Funciona */}
      <HowItWorksSection />

      {/* Mapa Dinámico */}
      <DynamicMapSection />

      {/* Contacto de Cliente */}
      <ClientContactSection />

      {/* Botón Únete como Pro / Join as Pro */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <Link href="/join-as-pro">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Únete como Pro en Sumee App"
          >
            Únete como Pro / Join as Pro
          </button>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}