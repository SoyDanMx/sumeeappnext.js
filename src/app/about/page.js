// src/app/about/page.js
export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6">Sobre Nosotros / About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Bienvenido a SUMEE, tu solución para encontrar servicios profesionales de confianza. 
          Nos dedicamos a conectar a clientes con expertos en diversas áreas, garantizando calidad y satisfacción.
        </p>
        <p className="text-lg text-gray-700">
          Nuestra misión es facilitar el acceso a servicios de alta calidad mientras apoyamos a profesionales 
          independientes para que crezcan en sus carreras.
        </p>
      </div>
    </div>
  );
}