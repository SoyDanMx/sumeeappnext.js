"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayerWithNoSSR = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const MarkerWithNoSSR = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const PopupWithNoSSR = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function TechniciansSection() {
  const initialTechnicians = [
    { id: 1, name: "Carlos Rodríguez", lat: 19.4326, lng: -99.1332, category: "Electricista", rating: 5 },
    { id: 2, name: "Ana María López", lat: 19.4286, lng: -99.1277, category: "Plomero", rating: 4 },
    { id: 3, name: "Juan Pérez", lat: 19.4350, lng: -99.1300, category: "Redes WiFi", rating: 3 },
  ];

  const [category, setCategory] = useState("Todas");
  const [distance, setDistance] = useState(10);
  const [rating, setRating] = useState("Todas");

  const filteredTechnicians = useMemo(() => {
    let filtered = initialTechnicians;

    if (category !== "Todas") {
      filtered = filtered.filter((tech) => tech.category === category);
    }

    filtered = filtered.filter((tech) => {
      const distanceToTech = 5; // Simulación
      return distanceToTech <= distance;
    });

    if (rating !== "Todas") {
      const minRating = parseInt(rating);
      filtered = filtered.filter((tech) => tech.rating >= minRating);
    }

    return filtered;
  }, [category, distance, rating]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.href = "/leaflet.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Técnicos disponibles cerca de ti / Pros near you
        </h2>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[30%]">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Filtros / Filters</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría / Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm rounded-lg transition-all duration-300"
                  >
                    <option>Todas / All</option>
                    <option>Electricista / Electrician</option>
                    <option>Plomero / Plumber</option>
                    <option>Redes WiFi / WiFi Setup</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                    Distancia / Distance
                  </label>
                  <input
                    type="range"
                    id="distance"
                    min="1"
                    max="50"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-gray-600 mt-2">{distance} km</p>
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    Calificación / Rating
                  </label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm rounded-lg transition-all duration-300"
                  >
                    <option>Todas / All</option>
                    <option>5 estrellas / 5 stars</option>
                    <option>4+ estrellas / 4+ stars</option>
                    <option>3+ estrellas / 3+ stars</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[70%] h-[600px] rounded-xl overflow-hidden shadow-lg relative">
            <MapWithNoSSR center={[19.4326, -99.1332]} zoom={12} style={{ height: "600px", width: "100%" }}>
              <TileLayerWithNoSSR
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              {filteredTechnicians.map((tech) => (
                <MarkerWithNoSSR key={tech.id} position={[tech.lat, tech.lng]}>
                  <PopupWithNoSSR>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{tech.name}</h3>
                      <p className="text-gray-600">{tech.category}</p>
                      <p className="text-gray-600">Calificación: {tech.rating} estrellas</p>
                      <button className="mt-3 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-all duration-300 text-sm">
                        Contactar / Contact
                      </button>
                    </div>
                  </PopupWithNoSSR>
                </MarkerWithNoSSR>
              ))}
            </MapWithNoSSR>
          </div>
        </div>
      </div>
    </section>
  );
}