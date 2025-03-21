export default function HowItWorksSection() {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cómo Funciona / How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Busca un servicio / Search for a service
              </h3>
              <p className="text-gray-600">
                Ingresa el servicio que necesitas y tu ubicación.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Encuentra un experto / Find an expert
              </h3>
              <p className="text-gray-600">
                Explora profesionales cerca de ti y revisa sus calificaciones.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Contrata con confianza / Hire with confidence
              </h3>
              <p className="text-gray-600">
                Contacta al experto y agenda tu servicio fácilmente.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }