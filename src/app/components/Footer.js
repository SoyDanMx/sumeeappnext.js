import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Sumee Logo" width={40} height={40} />
              <h3 className="text-2xl font-bold tracking-tight">Sumee</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conecta con técnicos confiables para cualquier servicio que necesites, en minutos.
            </p>
          </div>
          {/* Resto del código igual */}
        </div>
        {/* Resto del código igual */}
      </div>
    </footer>
  );
}