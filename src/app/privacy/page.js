// src/app/privacy/page.js
import Link from "next/link";

export default function Privacy() {
  // Formatear la fecha actual (08 de abril de 2025)
  const lastUpdated = new Date("2025-04-08").toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Política de Privacidad de Sumee
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Última actualización:</span> {lastUpdated}
          </p>
          <p className="text-lg text-gray-700 mb-6">
            En Sumee, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información personal conforme a las leyes mexicanas aplicables, incluyendo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>
          <ul className="space-y-6">
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Información que Recopilamos
              </h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Información Personal:</span> Cuando utilizas nuestros servicios, podemos recopilar datos personales como tu nombre, dirección de correo electrónico, número telefónico y dirección física.
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Información de Uso:</span> Recopilamos información sobre tu interacción con nuestra plataforma, incluyendo las páginas que visitas, el tiempo que pasas en ellas y otros datos estadísticos.
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Cookies y Tecnologías Similares:</span> Utilizamos cookies para mejorar tu experiencia en nuestro sitio web, recordar tus preferencias y analizar el tráfico del sitio.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Uso de la Información
              </h2>
              <p className="text-gray-600">
                La información que recopilamos la utilizamos para:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
                <li>Proporcionar y gestionar nuestros servicios.</li>
                <li>Personalizar tu experiencia en nuestra plataforma.</li>
                <li>Comunicarnos contigo, responder a tus consultas y enviarte actualizaciones relevantes.</li>
                <li>Mejorar nuestros servicios y desarrollar nuevas funcionalidades.</li>
                <li>Cumplir con obligaciones legales y regulaciones aplicables.</li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Compartición de la Información
              </h2>
              <p className="text-gray-600 mb-2">
                No compartimos tu información personal con terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
                <li>
                  <span className="font-semibold">Proveedores de Servicios:</span> Podemos compartir información con proveedores externos que nos ayudan a operar nuestra plataforma y ofrecer nuestros servicios, siempre bajo acuerdos de confidencialidad.
                </li>
                <li>
                  <span className="font-semibold">Obligaciones Legales:</span> Si es requerido por ley o en respuesta a procesos legales, podemos divulgar tu información.
                </li>
                <li>
                  <span className="font-semibold">Consentimiento:</span> Con tu consentimiento explícito, podemos compartir tu información con terceros para fines específicos.
                </li>
              </ul>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Seguridad de la Información
              </h2>
              <p className="text-gray-600">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra accesos no autorizados, pérdida o destrucción. Sin embargo, ninguna transmisión de datos por Internet es completamente segura; por lo tanto, no podemos garantizar la seguridad absoluta de la información transmitida a través de nuestra plataforma.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Tus Derechos
              </h2>
              <p className="text-gray-600">
                De acuerdo con la legislación mexicana, tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos personales (derechos ARCO). Para ejercer estos derechos, por favor contáctanos a través de{" "}
                <a href="mailto:sumeeapp.com@gmail.com" className="text-primary hover:underline">
                  sumeeapp.com@gmail.com
                </a>.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Cambios a esta Política de Privacidad
              </h2>
              <p className="text-gray-600">
                Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Te notificaremos sobre cambios significativos a través de nuestra plataforma o por otros medios apropiados. Te recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos tu información.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                Contacto
              </h2>
              <p className="text-gray-600">
                Si tienes preguntas o inquietudes sobre esta Política de Privacidad o sobre el manejo de tu información personal, puedes contactarnos en:
              </p>
              <ul className="list-none ml-4 mt-2 text-gray-600 space-y-1">
                <li>Nuo Networks</li>
                <li>Atenas 1-1 Col San Alvaro, Azcapotzalco, Ciudad de México, C.P. 02090</li>
                <li>
                  <a href="mailto:sumeeapp.com@gmail.com" className="text-primary hover:underline">
                    Sumeeapp.com@gmail.com
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