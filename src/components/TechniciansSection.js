import Link from "next/link";

export default function TechniciansSection({ technicians }) {
  // Lista estática de técnicos si no se pasa la prop
  const defaultTechnicians = [
    { id: 1, name: "Juan Pérez", specialty: "Electricista", location: "Ciudad de México" },
    { id: 2, name: "María Gómez", specialty: "Plomera", location: "Guadalajara" },
    { id: 3, name: "Carlos López", specialty: "Carpintero", location: "Monterrey" },
  ];

  const techs = technicians || defaultTechnicians;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {techs.map((technician) => (
        <div
          key={technician.id}
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-800">{technician.name}</h3>
          <p className="text-gray-600 mt-2">Especialidad: {technician.specialty}</p>
          <p className="text-gray-600 mt-1">Ubicación: {technician.location}</p>
          <Link
            href={`/technician/${technician.id}`}
            className="mt-4 inline-block text-primary hover:underline"
          >
            Ver más / See more
          </Link>
        </div>
      ))}
    </div>
  );
}