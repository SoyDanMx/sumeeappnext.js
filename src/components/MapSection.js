// src/components/MapSection.js
"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Cookies from 'js-cookie';
import { areaCoordinates, defaultCoordinates } from '../utils/coordinates';

export default function MapSection() {
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
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-lg">Cargando mapa... / Loading map...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Profesionales en tu Área / Professionals in Your Area
        </h2>
        {hasMembership ? (
          <MapContainer
            center={[19.4326, -99.1332]} // Centro de la Ciudad de México
            zoom={12}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {professionals.map((pro) => {
              const position = pro.area && areaCoordinates[pro.area]
                ? areaCoordinates[pro.area]
                : defaultCoordinates;

              return (
                <Marker key={pro.id} position={[position.lat, position.lng]}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{pro.name}</h3>
                      <p>{pro.profession}</p>
                      <p>Área: {pro.area || 'No especificada'}</p>
                      {pro.phone && (
                        <a
                          href={`https://wa.me/${pro.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Contactar por WhatsApp
                        </a>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">
              Necesitas un membership para ver a los profesionales en el mapa. / You need a membership to view professionals on the map.
            </p>
            <button
              className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors"
              onClick={() => window.alert('Funcionalidad de compra de membership aún no implementada.')}
            >
              Comprar Membership / Buy Membership
            </button>
          </div>
        )}
      </div>
    </section>
  );
}