import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Terms() {
  return (
    <main>
      <Header />
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Términos de Servicio / Terms of Service</h1>
          <div className="prose max-w-none text-gray-600">
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Aceptación de los Términos</h2>
            <p className="mb-4">
              Al usar Sumee, aceptas cumplir con estos Términos de Servicio. Si no estás de acuerdo, por favor no utilices nuestra plataforma.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Uso de la Plataforma</h2>
            <p className="mb-4">
              Sumee conecta a usuarios con técnicos profesionales. No nos hacemos responsables por los servicios prestados por los técnicos, pero nos esforzamos por verificar su calidad.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Responsabilidades del Usuario</h2>
            <p className="mb-4">
              Los usuarios deben proporcionar información precisa y no usar la plataforma para fines ilegales o no autorizados.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Contacto</h2>
            <p>
              Si tienes alguna pregunta sobre estos términos, contáctanos en <a href="/contact" className="text-primary hover:underline">nuestra página de contacto</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}