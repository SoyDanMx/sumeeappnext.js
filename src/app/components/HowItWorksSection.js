export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          ¿Cómo funciona? / How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex justify-center">
              <i className="ri-search-line text-5xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              1. Busca / Search
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Ingresa el servicio que necesitas y tu ubicación.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <i className="ri-user-search-line text-5xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              2. Encuentra / Find
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Explora una lista de técnicos confiables cerca de ti.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <i className="ri-chat-smile-3-line text-5xl text-primary"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              3. Conecta / Connect
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Contacta al técnico que mejor se adapte a tus necesidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}