"use client";

import { useEffect } from "react";
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
  const mockTechnicians = [
    { id: 1, name: "Carlos Rodríguez", lat: 19.4326, lng: -99.1332, category: "Electricista" },
    { id: 2, name: "Ana María López", lat: 19.4286, lng: -99.1277, category: "Plomero" },
  ];

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
        <h2 className="text-3xl font-bold text-center mb-12">
          Técnicos disponibles cerca de ti / Pros near you
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[30%]">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Filtros / Filters</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría / Category
                  </label>
                  <select
                    id="category"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>Todas / All</option>
                    <option>Electricista / Electrician</option>
                    <option>Plomero / Plumber</option>
                    <option>Redes WiFi / WiFi Setup</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-gray-700">
                    Distancia / Distance
                  </label>
                  <input
                    type="range"
                    id="distance"
                    min="1"
                    max="50"
                    defaultValue="10"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm text-gray-600 mt-1">10 km</p>
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                    Calificación / Rating
                  </label>
                  <select
                    id="rating"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
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
          <div className="w-full lg:w-[70%] h-[600px] rounded-lg overflow-hidden relative">
            <MapWithNoSSR center={[19.4326, -99.1332]} zoom={12} style={{ height: "600px", width: "100%" }}>
              <TileLayerWithNoSSR
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              {mockTechnicians.map((tech) => (
                <MarkerWithNoSSR key={tech.id} position={[tech.lat, tech.lng]}>
                  <PopupWithNoSSR>
                    <div className="p-2">
                      <h3 className="font-semibold">{tech.name}</h3>
                      <p className="text-gray-600">{tech.category}</p>
                      <button className="mt-2 bg-primary text-white px-3 py-1 rounded-button text-sm">
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