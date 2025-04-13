// src/utils/coordinates.js
export const areaCoordinates = {
    "Cuauhtémoc, Ciudad de México": { lat: 19.42847, lng: -99.12766 },
    "Álvaro Obregón, Ciudad de México": { lat: 19.35867, lng: -99.20329 },
    "Benito Juárez, Ciudad de México": { lat: 19.37189, lng: -99.15994 },
    "Coyoacán, Ciudad de México": { lat: 19.3467, lng: -99.16174 },
    "Iztapalapa, Ciudad de México": { lat: 19.35529, lng: -99.06224 },
    // Añade más alcaldías o áreas según necesites
  };
  
  // Fallback si el área no está en la lista
  export const defaultCoordinates = { lat: 19.4326, lng: -99.1332 }; // Centro de la Ciudad de México