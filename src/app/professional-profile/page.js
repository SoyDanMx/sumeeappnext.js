// src/app/professional-profile/page.js
"use client";

import { useState, useEffect } from "react";
import BookingSystem from "../../components/booking/BookingSystem";
import { useParams } from "next/navigation";

export default function ProfessionalProfile() {
  const [professional, setProfessional] = useState(null);
  const [activeTab, setActiveTab] = useState("bio");
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchProfessional() {
      try {
        const res = await fetch(`/api/professionals/${params.id}`);
        const data = await res.json();
        setProfessional(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando profesional:", error);
        setLoading(false);
      }
    }
    fetchProfessional();
  }, [params.id]);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (!professional) return <div className="text-center py-8">Profesional no encontrado</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{professional.name}</h1>
      <div className="tabs mb-6 flex space-x-2">
        <button
          onClick={() => setActiveTab("bio")}
          className={`px-4 py-2 rounded ${activeTab === "bio" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Biografía
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2 rounded ${activeTab === "services" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Servicios
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 rounded ${activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Reseñas
        </button>
        <button
          onClick={() => setActiveTab("booking")}
          className={`px-4 py-2 rounded ${activeTab === "booking" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Reservar
        </button>
      </div>
      {activeTab === "bio" && <p className="text-gray-700">{professional.bio || "Sin biografía disponible."}</p>}
      {activeTab === "services" && (
        <ul className="list-disc pl-5">
          {(professional.services || []).map((service, index) => (
            <li key={index} className="text-gray-700">{service}</li>
          ))}
        </ul>
      )}
      {activeTab === "reviews" && (
        <div>
          {(professional.reviews || []).map((review, index) => (
            <p key={index} className="text-gray-700">{review}</p>
          ))}
        </div>
      )}
      {activeTab === "booking" && <BookingSystem professional={professional} />}
    </div>
  );
}