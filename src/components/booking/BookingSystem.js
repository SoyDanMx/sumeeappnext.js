// src/components/booking/TimeSlotPicker.js
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function TimeSlotPicker({ date, professional, onSelect, selectedSlot }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const res = await fetch(`/api/professionals/${professional.id}/time-slots?date=${date.toISOString()}`);
        const data = await res.json();
        setSlots(data.slots);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando horarios:", error);
        toast.error("Error cargando horarios");
        setLoading(false);
      }
    }
    fetchSlots();
  }, [date, professional.id]);

  if (loading) return <div>Cargando horarios...</div>;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Selecciona un horario</h3>
      <div className="grid grid-cols-3 gap-2">
        {slots.length === 0 && <p className="text-gray-500">No hay horarios disponibles</p>}
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`px-4 py-2 rounded ${
              selectedSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}