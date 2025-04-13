// src/components/Header.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [language, setLanguage] = useState('ES');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <header className="fixed w-full bg-gradient-to-b from-white to-transparent z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="SUMEE Logo"
            width={400}
            height={90}
            className="max-h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/professionals">
            <button
              className="text-secondary hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
              aria-label="Ver Profesionales en Sumee App"
            >
              Profesionales / Professionals
            </button>
          </Link>

          <Link href="/join-as-pro">
            <button
              className="text-primary border border-primary px-4 py-2 rounded-button hover:bg-primary hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              aria-label="Únete como Pro en Sumee App"
            >
              Únete como Pro / Join as Pro
            </button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <button
                  className="text-secondary hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
                  aria-label="Ver Perfil en Sumee App"
                >
                  Mi Perfil / My Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="text-secondary hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
                aria-label="Cerrar Sesión en Sumee App"
              >
                Cerrar Sesión / Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  className="text-secondary hover:text-primary transition-colors whitespace-nowrap cursor-pointer"
                  aria-label="Iniciar Sesión en Sumee App"
                >
                  Iniciar Sesión / Log In
                </button>
              </Link>
              <Link href="/signup">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap cursor-pointer"
                  aria-label="Registrarse en Sumee App"
                >
                  Registrarse / Sign Up
                </button>
              </Link>
            </>
          )}

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