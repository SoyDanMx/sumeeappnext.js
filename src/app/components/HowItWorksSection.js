export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Cómo Funciona / How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Busca un servicio / Search for a service
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Ingresa el servicio que necesitas y tu ubicación.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Encuentra un experto / Find an expert
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Explora profesionales cerca de ti y revisa sus calificaciones.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Contrata con confianza / Hire with confidence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Contacta al experto y agenda tu servicio fácilmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}