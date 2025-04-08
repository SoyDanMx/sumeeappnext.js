// src/app/membership/page.js
import Link from "next/link";

export default function Membership() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Membresía Sumee / Sumee Membership
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            Únete a la Membresía Sumee y disfruta de soporte técnico de primera clase con beneficios exclusivos. Por solo MXP $500.00  al año, obtén descuentos, soporte prioritario y herramientas para gestionar tus necesidades técnicas de manera más eficiente.
          </p>
          <ul className="space-y-6">
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                1. Descuentos Exclusivos / Exclusive Discounts
              </h2>
              <p className="text-gray-600">
                Ahorra un 15% en todas las sesiones de soporte técnico contratadas a través de nuestra plataforma. Ya sea que necesites ayuda con tu computadora, red Wi-Fi o cualquier dispositivo, con la Membresía Sumee obtienes el mejor precio.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                2. Soporte Prioritario / Priority Support
              </h2>
              <p className="text-gray-600">
                Como miembro, tus solicitudes de soporte técnico se procesan con prioridad, conectándote con nuestros agentes verificados más rápido que nunca. Resuelve tus problemas técnicos en tiempo récord.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                3. Herramientas de Gestión / Management Tools
              </h2>
              <p className="text-gray-600">
                Accede a un panel de control exclusivo donde puedes rastrear tus solicitudes de soporte, programar sesiones recurrentes (como mantenimiento mensual) y recibir recordatorios para mantener tus dispositivos en óptimas condiciones.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                4. Cancelación Flexible / Flexible Cancellation
              </h2>
              <p className="text-gray-600">
                Puedes cancelar tu membresía en cualquier momento. Si cancelas dentro de los primeros 30 días, te reembolsaremos el costo total de la membresía, sin preguntas.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                5. Únete Hoy / Join Today
              </h2>
              <p className="text-gray-600">
                La Membresía Sumee cuesta solo MXP $500.00 al año. Regístrate hoy y comienza a disfrutar de soporte técnico más rápido, económico y eficiente.
              </p>
              <div className="mt-4">
                <Link
                  href="/signup-membership"
                  className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors inline-block"
                >
                  Únete Ahora / Join Now
                </Link>
              </div>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                6. Contacto / Contact
              </h2>
              <p className="text-gray-600">
                Si tienes preguntas sobre la Membresía Sumee, contáctanos en:
              </p>
              <ul className="list-none ml-4 mt-2 text-gray-600 space-y-1">
                <li>Nuo Networks</li>
                <li>Atenas 1-1 Col San Alvaro, Azcapotzalco, Ciudad de México, C.P. 02090</li>
                <li>
                  <a href="mailto:sumeeapp.com@gmail.com" className="text-primary hover:underline">
                    sumeeapp.com@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+525567283971" className="text-primary hover:underline">
                    +52 55 6728 3971
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}