"use client";

import { useRouter } from "next/navigation";
import {
  FaBolt,
  FaWrench, // Reemplazo para FaPipeSection
  FaWifi,
  FaCamera,
  FaSnowflake,
  FaPaintRoller,
  FaSoap, // Reemplazo para FaBroom
  FaBug,
  FaTree,
  FaHammer,
  FaBuilding,
  FaCube, // Reemplazo para FaWall
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaBolt className="w-10 h-10" />,
    title: "Electricistas / Electricians",
    description: "Instalación y reparación eléctrica / Electrical installation and repair",
  },
  {
    id: 2,
    icon: <FaWrench className="w-10 h-10" />, // Cambiado de FaPipeSection a FaWrench
    title: "Plomeros / Plumbers",
    description: "Servicios de plomería profesional / Professional plumbing services",
  },
  {
    id: 3,
    icon: <FaWifi className="w-10 h-10" />,
    title: "Redes WiFi / WiFi Setup",
    description: "Instalación y configuración de redes / Network installation and setup",
  },
  {
    id: 4,
    icon: <FaCamera className="w-10 h-10" />,
    title: "CCTV y Alarmas / Security Systems",
    description: "Sistemas de seguridad integral / Comprehensive security systems",
  },
  {
    id: 5,
    icon: <FaSnowflake className="w-10 h-10" />,
    title: "Aire Acondicionado / AC Technicians",
    description: "Instalación y mantenimiento / Installation and maintenance",
  },
  {
    id: 6,
    icon: <FaPaintRoller className="w-10 h-10" />,
    title: "Pintores / Painters",
    description: "Servicios profesionales de pintura / Professional painting services",
  },
  {
    id: 7,
    icon: <FaSoap className="w-10 h-10" />, // Cambiado de FaBroom a FaSoap
    title: "Limpieza / Cleaning",
    description: "Servicios profesionales de limpieza / Professional cleaning services",
  },
  {
    id: 8,
    icon: <FaBug className="w-10 h-10" />,
    title: "Fumigación / Pest Control",
    description: "Control de plagas profesional / Professional pest control",
  },
  {
    id: 9,
    icon: <FaTree className="w-10 h-10" />,
    title: "Jardinería / Gardening",
    description: "Mantenimiento de jardines / Garden maintenance",
  },
  {
    id: 10,
    icon: <FaHammer className="w-10 h-10" />,
    title: "Carpintería / Carpentry",
    description: "Trabajos en madera / Woodworking services",
  },
  {
    id: 11,
    icon: <FaBuilding className="w-10 h-10" />,
    title: "Arquitectura y Construcción / Architecture & Construction",
    description: "Diseño y construcción / Design and construction",
  },
  {
    id: 12,
    icon: <FaCube className="w-10 h-10" />, // Cambiado de FaWall a FaCube
    title: "Tablaroca / Drywall",
    description: "Instalación y reparación / Installation and repair",
  },
];

export default function ServicesSection() {
  const router = useRouter();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Nuestros Servicios / Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white group p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => router.push(`/services/${service.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  router.push(`/services/${service.id}`);
                }
              }}
              aria-label={`Ver más sobre ${service.title}`}
            >
              <div className="flex justify-center mb-4 text-purple-600">
                <div className="p-3 bg-purple-50 rounded-full">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}