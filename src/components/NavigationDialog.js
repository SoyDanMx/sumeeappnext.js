"use client";

import { useState } from 'react';

export default function NavigationDialog({ onOptionSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Abrir Navegación y Servicios
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Navegación y Servicios</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <button
                  onClick={() => handleOptionClick('search')}
                  className="text-blue-600 hover:underline"
                >
                  Buscar Lugares
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionClick('routes')}
                  className="text-blue-600 hover:underline"
                >
                  Ver Rutas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionClick('addMarker')}
                  className="text-blue-600 hover:underline"
                >
                  Agregar Marcador
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionClick('settings')}
                  className="text-blue-600 hover:underline"
                >
                  Configuración
                </button>
              </li>
            </ul>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}