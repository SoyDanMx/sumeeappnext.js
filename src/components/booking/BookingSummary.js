// src/components/booking/BookingSummary.js
"use client";

import { format } from "date-fns";
import es from "date-fns/locale/es";

export default function BookingSummary({ professional, date, timeSlot, onConfirm }) {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Resumen de la Reserva</h3>
      <p><strong>Profesional:</strong> {professional.name}</p>
      <p><strong>Fecha:</strong> {format(date, "dd MMMM yyyy", { locale: es })}</p>
      <p><strong>Hora:</strong> {timeSlot}</p>
      <button
        onClick={onConfirm}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Confirmar Reserva
      </button>
    </div>
  );
}