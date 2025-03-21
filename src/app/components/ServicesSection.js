export default function ServicesSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Nuestros Servicios / Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center">
            <i className="ri-lightbulb-flash-line text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Electricista / Electrician</h3>
            <p className="text-gray-600 leading-relaxed">
              Soluciones eléctricas confiables para tu hogar o negocio.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center">
            <i className="ri-water-flash-line text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Plomero / Plumber</h3>
            <p className="text-gray-600 leading-relaxed">
              Reparaciones y mantenimiento de tuberías y sistemas de agua.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center">
            <i className="ri-wifi-line text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Redes WiFi / WiFi Setup</h3>
            <p className="text-gray-600 leading-relaxed">
              Configuración y optimización de redes inalámbricas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center">
            <i className="ri-tools-line text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Otros Servicios / Other Services</h3>
            <p className="text-gray-600 leading-relaxed">
              Encuentra expertos para cualquier necesidad técnica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}