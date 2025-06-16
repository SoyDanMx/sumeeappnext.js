// src/app/page.js
'use client';

import TechnicianBanner from '../components/TechnicianBanner';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ClientContactSection from '../components/ClientContactSection';
import Footer from '../components/Footer';
import Link from 'next/link';
import DynamicMapSection from '../components/DynamicMapSection';

// Ejemplo estático (reemplaza con fetch si usas datos dinámicos)
const dummyProfessional = { name: 'Ejemplo Técnico' }; // O usa un estado/fetch

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section (Caja Azul con Imagen a la Derecha) */}
      <TechnicianBanner professional={dummyProfessional} />

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