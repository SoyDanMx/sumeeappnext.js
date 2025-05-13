// components/HeroSection.js
"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

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
    <section className={styles.hero}>
      <div className={styles.banner}>
        {/* Lado del texto y formulario de búsqueda */}
        <div className={styles.textSection}>
          <h1 className={styles.title}>
            Encuentra profesionales cerca de ti en segundos / Connect with professionals near you in seconds
          </h1>
          <p className={styles.subtitle}>
            Conectamos expertos certificados con personas que necesitan servicios técnicos de calidad / We connect certified experts with people who need quality technical services
          </p>
          <form onSubmit={handleSearch} className={styles.searchBar}>
            <div className={styles.inputWrapper}>
              <div className={styles.icon}>
                <i className="ri-search-line text-gray-400"></i>
              </div>
              <input
                type="search"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={styles.searchInput}
                placeholder="¿Qué servicio necesitas? / What service do you need?"
              />
            </div>
            <div className={styles.inputWrapper}>
              <div className={styles.icon}>
                <i className="ri-map-pin-line text-gray-400"></i>
              </div>
              <input
                type="search"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.searchInput}
                placeholder="Tu ubicación / Your location"
              />
            </div>
            <button type="submit" className={styles.searchButton}>
              Buscar / Search
            </button>
          </form>
        </div>

        {/* Lado de la imagen */}
        <div className={styles.imageSection}>
          <Image
            src="/images/technician-banner.jpg"
            alt="Técnico profesional"
            width={700}
            height={560}
            className={styles.bannerImage}
            priority
          />
        </div>
      </div>

      {/* Notificación */}
      {notification && (
        <div className={styles.notification}>
          <div
            className={`${styles.notificationContent} ${
              notification.type === 'error' ? styles.error : styles.success
            }`}
          >
            <p>{notification.message}</p>
            <button onClick={() => setNotification(null)} className={styles.closeButton}>
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}