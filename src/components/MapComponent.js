"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function MapComponent({ technicians, selectedCategories }) {
  const mapRef = useRef(null);
  const containerId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);
  const markersRef = useRef(new Map());

  useEffect(() => {
    const container = document.getElementById(containerId.current);
    if (container && container._leaflet_id) {
      return;
    }

    const map = L.map(containerId.current, {
      center: [19.4326, -99.1332],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const technicianIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    technicians.forEach((tech) => {
      const marker = L.marker([tech.lat, tech.lng], { icon: technicianIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${tech.name}</h3>
            <p class="text-gray-600">${tech.category}</p>
            <button onclick="window.open('https://wa.me/525515118907?text=Hola%20${encodeURIComponent(tech.name)},%20necesito%20tus%20servicios')"
              class="mt-2 bg-primary text-white px-3 py-1 rounded-button text-sm">
              Contactar / Contact
            </button>
          </div>
        `);
      markersRef.current.set(tech.category, marker);
      if (selectedCategories.length === 0 || selectedCategories.includes(tech.category)) {
        marker.addTo(map);
      }
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [technicians]);

  useEffect(() => {
    markersRef.current.forEach((marker, category) => {
      if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
        marker.addTo(mapRef.current);
      } else {
        marker.remove();
      }
    });
  }, [selectedCategories]);

  return <div id={containerId.current} style={{ height: '600px', width: '100%' }} />;
}