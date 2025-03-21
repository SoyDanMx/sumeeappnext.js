export default function ServicesSection() {
    const services = [
      { icon: "ri-flashlight-line", title: "Electricistas / Electricians", description: "Instalación y reparación eléctrica / Electrical installation and repair" },
      { icon: "ri-tools-line", title: "Plomeros / Plumbers", description: "Servicios de plomería profesional / Professional plumbing services" },
      { icon: "ri-wifi-line", title: "Redes WiFi / WiFi Setup", description: "Instalación y configuración de redes / Network installation and setup" },
      { icon: "ri-camera-line", title: "CCTV y Alarmas / Security Systems", description: "Sistemas de seguridad integral / Comprehensive security systems" },
      { icon: "ri-temp-cold-line", title: "Aire Acondicionado / AC Technicians", description: "Instalación y mantenimiento / Installation and maintenance" },
      { icon: "ri-paint-brush-line", title: "Pintores / Painters", description: "Servicios profesionales de pintura / Professional painting services" },
      { icon: "ri-broom-line", title: "Limpieza / Cleaning", description: "Servicios profesionales de limpieza / Professional cleaning services" },
      { icon: "ri-bug-line", title: "Fumigación / Pest Control", description: "Control de plagas profesional / Professional pest control" },
      { icon: "ri-plant-line", title: "Jardinería / Gardening", description: "Mantenimiento de jardines / Garden maintenance" },
      { icon: "ri-hammer-line", title: "Carpintería / Carpentry", description: "Trabajos en madera / Woodworking services" },
      { icon: "ri-building-line", title: "Arquitectura y Construcción", description: "Diseño y construcción / Architecture & Construction" },
      { icon: "ri-layout-line", title: "Tablaroca / Drywall", description: "Instalación y reparación / Installation and repair" },
    ];
  
    return (
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios / Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <i className={`${service.icon} text-2xl text-primary`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  