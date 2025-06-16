// src/components/nav/Navbar.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: "Electricistas / Electricians",
    icon: "⚡"
  },
  {
    title: "Plomeros / Plumbers",
    icon: "🚰"
  },
  {
    title: "Redes WiFi / WiFi Setup",
    icon: "📶"
  },
  {
    title: "CCTV y Alarmas / Security Systems",
    icon: "🔐"
  },
  {
    title: "Aire Acondicionado / AC Technicians",
    icon: "❄️"
  },
  {
    title: "Pintores / Painters",
    icon: "🎨"
  },
  {
    title: "Limpieza / Cleaning",
    icon: "🧹"
  },
  {
    title: "Fumigación / Pest Control",
    icon: "🐜"
  },
  {
    title: "Jardinería / Gardening",
    icon: "🌿"
  },
  {
    title: "Carpintería / Carpentry",
    icon: "🪚"
  },
  {
    title: "Arquitectura y Construcción / Architecture & Construction",
    icon: "🏗️"
  },
  {
    title: "Tablaroca / Drywall",
    icon: "🧱"
  }
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-12">
              <Image
                src="/logo.png"
                alt="Sumee Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Main Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${openDropdown === 'services' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Servicios / Services
                <svg className={`ml-1 h-4 w-4 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {openDropdown === 'services' && (
                <div className="absolute left-0 top-full mt-0 w-64 bg-white rounded-b-lg shadow-xl z-50 border-t-2 border-blue-500 max-h-[70vh] overflow-y-auto">
                  <div className="p-4 space-y-2">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <span className="text-xl">{service.icon}</span>
                        <span className="font-medium text-gray-800">{service.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/professionals" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors">
              Profesionales / Professionals
            </Link>
            
            <Link href="/join-as-pro" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors">
              Únete como Pro / Join as Pro
            </Link>
            
            <Link href="/login" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors">
              Iniciar Sesión / Log In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Registrarse / Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}