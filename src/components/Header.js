"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [language, setLanguage] = useState('ES');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <header className="fixed w-full bg-gradient-to-b from-white to-transparent z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-['Pacifico'] text-primary text-3xl">
          Sumee
        </Link>
        <div className="flex items-center gap-6">
          <button className="text-primary border border-primary px-4 py-2 rounded-button hover:bg-primary hover:text-white transition-colors whitespace-nowrap cursor-pointer">
            Únete como Pro / Join as Pro
          </button>
          <button className="text-secondary hover:text-primary transition-colors whitespace-nowrap cursor-pointer">
            Iniciar Sesión / Log In
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap cursor-pointer">
            Registrarse / Sign Up
          </button>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => handleLanguageChange('ES')}
              className={`px-2 py-1 rounded-full cursor-pointer ${
                language === 'ES' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => handleLanguageChange('EN')}
              className={`px-2 py-1 rounded-full cursor-pointer ${
                language === 'EN' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}