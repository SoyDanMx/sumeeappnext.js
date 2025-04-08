// src/app/guarantee/policy/page.js
export default function GuaranteePolicy() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-primary mb-8 text-center">
            Política de Garantía de Sumee
          </h1>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <p className="text-lg text-gray-700 mb-6">
              A continuación, detallamos los términos y condiciones de nuestra Garantía de Satisfacción:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-600">
              <li>
                La garantía aplica únicamente a servicios contratados a través de la plataforma Sumee.
              </li>
              <li>
                Para solicitar soporte o un reembolso, el cliente debe contactar a nuestro equipo de atención al cliente dentro de los 30 días posteriores a la realización del servicio.
              </li>
              <li>
                Los reembolsos parciales o totales están sujetos a la evaluación del caso por parte de nuestro equipo.
              </li>
              <li>
                Sumee se reserva el derecho de enviar un nuevo agente de servicio o equipo técnico como parte de la solución antes de proceder con un reembolso.
              </li>
              <li>
                Esta garantía no cubre daños causados por mal uso del servicio por parte del cliente.
              </li>
            </ul>
            <p className="text-gray-600 mt-6">
              Si tienes alguna duda, contáctanos en{" "}
              <a href="mailto:support@sumee.com" className="text-primary hover:underline">
                support@sumee.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    );
  }