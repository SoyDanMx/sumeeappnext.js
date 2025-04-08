// src/app/code-of-conduct/page.js
import Link from "next/link";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Código de Conducta de Sumee / Sumee Code of Conduct
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            En Sumee, nos comprometemos a mantener los más altos estándares de integridad, profesionalismo y transparencia en todas nuestras operaciones. Este Código de Conducta establece las expectativas para todos los usuarios de nuestra plataforma, incluyendo clientes, agentes de soporte técnico y empleados, para garantizar un entorno seguro, respetuoso y ético.
          </p>
          <ul className="space-y-6">
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                1. Valores y Principios Éticos / Values and Ethical Principles
              </h2>
              <p className="text-gray-600">
                Nos guiamos por los principios de integridad, respeto y excelencia. Todos los usuarios de Sumee deben actuar con honestidad, tratar a los demás con respeto y cumplir con las leyes aplicables, incluyendo la Ley Federal de Protección de Datos Personales en Posesión de los Particulares en México. Nos esforzamos por ofrecer un soporte técnico de alta calidad que sea accesible y confiable para todos nuestros clientes.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                2. Interacciones con Clientes y Agentes / Interactions with Clients and Agents
              </h2>
              <p className="text-gray-600">
                Los agentes de soporte técnico deben tratar a los clientes con cortesía y profesionalismo en todo momento. Los clientes deben interactuar con los agentes de manera respetuosa, evitando cualquier forma de acoso, discriminación o comportamiento abusivo. Sumee no tolerará conductas que comprometan la seguridad o el bienestar de cualquier usuario.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                3. Uso Adecuado de la Plataforma / Proper Use of the Platform
              </h2>
              <p className="text-gray-600">
                Los usuarios deben utilizar la plataforma de Sumee únicamente para los fines previstos: solicitar y proporcionar soporte técnico. Está prohibido usar la plataforma para actividades fraudulentas, engañosas o ilegales, como la publicación de información falsa, el intento de estafar a otros usuarios o el uso indebido de los servicios para fines no autorizados.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                4. Confidencialidad y Privacidad / Confidentiality and Privacy
              </h2>
              <p className="text-gray-600">
                Respetamos la privacidad de nuestros usuarios y nos comprometemos a proteger sus datos personales. Los agentes de soporte técnico y los empleados de Sumee deben mantener la confidencialidad de la información del cliente y no divulgarla a terceros sin consentimiento, salvo que sea requerido por la ley. Para más detalles, consulta nuestra{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                5. Cumplimiento Legal / Legal Compliance
              </h2>
              <p className="text-gray-600">
                Todos los usuarios deben cumplir con las leyes y regulaciones aplicables, incluyendo las leyes de protección al consumidor, regulaciones laborales y cualquier otra normativa relevante en México y en los países donde operamos. Sumee cooperará con las autoridades legales si se detecta alguna actividad ilegal en la plataforma.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                6. Reporte de Violaciones / Reporting Violations
              </h2>
              <p className="text-gray-600">
                Si un usuario observa o experimenta una violación de este Código de Conducta, puede reportarlo a nuestro equipo de soporte a través de{" "}
                <a href="mailto:support@sumee.com" className="text-primary hover:underline">
                  support@sumee.com
                </a>. Garantizamos que los reportes se manejarán de manera confidencial y sin represalias para el denunciante.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                7. Consecuencias por Incumplimiento / Consequences of Non-Compliance
              </h2>
              <p className="text-gray-600">
                Las violaciones a este Código de Conducta pueden resultar en acciones disciplinarias, que incluyen la suspensión o terminación de la cuenta del usuario en la plataforma, así como la cooperación con las autoridades legales si es necesario. Sumee se reserva el derecho de tomar las medidas necesarias para proteger a sus usuarios y mantener la integridad de la plataforma.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold text-primary mb-2">
                8. Contacto / Contact
              </h2>
              <p className="text-gray-600">
                Si tienes preguntas o inquietudes sobre este Código de Conducta, puedes contactarnos en:
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