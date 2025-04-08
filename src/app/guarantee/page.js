// src/app/guarantee/page.js
import Link from "next/link";

export default function Guarantee() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Garantía de Satisfacción de Sumee
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            En Sumee, nos comprometemos a ofrecerte servicios de alta calidad que satisfagan tus expectativas. Por ello, te brindamos nuestra <span className="font-semibold">Garantía de Satisfacción</span>:
          </p>
          <ul className="space-y-6">
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Profesionales Verificados
              </h2>
              <p className="text-gray-600">
                Todos nuestros colaboradores pasan por un riguroso proceso de selección y verificación para garantizar su competencia y confiabilidad.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Soporte en Resolución de Problemas
              </h2>
              <p className="text-gray-600">
                Si el servicio recibido no cumple con lo acordado, nuestro equipo de atención al cliente está disponible para asistirte en la resolución del inconveniente.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Compromiso con la Calidad
              </h2>
              <p className="text-gray-600">
                Si después de nuestros esfuerzos no estás satisfecho con el servicio proporcionado, evaluaremos tu caso para ofrecerte una solución adecuada, que podría incluir el envío de un agente de servicio y un equipo técnico nuevo hasta encontrar tu solución o hasta el reembolso parcial o total del monto pagado.
              </p>
            </li>
          </ul>
          <p className="text-gray-600 mt-6">
            Aplican términos y condiciones. Para más detalles, consulta nuestra política de garantía{" "}
            <Link href="/guarantee/policy" className="text-primary hover:underline">
              aquí
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}