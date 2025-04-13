// src/app/professionals/page.js
"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Professionals() {
  const [hasMembership, setHasMembership] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar si el usuario tiene un membership
        const token = Cookies.get('token');
        if (token) {
          const membershipResponse = await fetch('/api/check-membership', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const membershipData = await membershipResponse.json();
          setHasMembership(membershipData.hasMembership);
        }

        // Obtener la lista de profesionales
        const professionalsResponse = await fetch('/api/professionals');
        const professionalsData = await professionalsResponse.json();
        setProfessionals(professionalsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <p className="text-lg">Cargando profesionales... / Loading professionals...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Profesionales / Professionals
        </h1>
        {hasMembership ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((pro) => (
              <div key={pro.id} className="bg-white p-6 rounded-lg shadow-sm">
                {pro.photo && (
                  <img
                    src={pro.photo}
                    alt={`Foto de ${pro.name}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2">{pro.name}</h2>
                <p className="text-gray-600 mb-2">Profesión: {pro.profession}</p>
                <p className="text-gray-600 mb-2">Área: {pro.area}</p>
                {pro.phone && (
                  <p className="text-gray-600 mb-2">
                    Teléfono: <a href={`tel:${pro.phone}`} className="text-primary hover:underline">{pro.phone}</a>
                  </p>
                )}
                {pro.averageRating > 0 && (
                  <p className="text-gray-600 mb-2">
                    Calificación promedio: {pro.averageRating} / 5
                  </p>
                )}
                {pro.workPhotos && pro.workPhotos.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Fotos de trabajos:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {pro.workPhotos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Trabajo de ${pro.name} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">
              Necesitas un membership para ver a los profesionales. / You need a membership to view professionals.
            </p>
            <Link href="/membership">
              <button className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors">
                Comprar Membership / Buy Membership
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}