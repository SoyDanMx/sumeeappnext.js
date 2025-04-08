// src/components/MapComponent.js
"use client";

import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuración estable de iconos
const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ center = [19.4326, -99.1332], zoom = 13 }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  // Memoiza la posición y zoom para referencia estable
  const stableCenter = useCallback(() => center, [center[0], center[1]]);
  const stableZoom = useCallback(() => zoom, [zoom]);

  useEffect(() => {
    if (!mapRef.current && containerRef.current) {
      // Inicialización única del mapa
      mapRef.current = L.map(containerRef.current, {
        center: stableCenter(),
        zoom: stableZoom(),
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Actualización suave de posición/zoom
    const updateMap = () => {
      if (mapRef.current) {
        mapRef.current.setView(stableCenter(), stableZoom());
      }
    };
    updateMap();

    // Limpieza segura
    return () => {
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [stableCenter, stableZoom]); // Dependencias estables

  return <div ref={containerRef} style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;