import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <main>
      <Header />
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Acerca de Sumee / About Sumee</h1>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-6">
              Sumee es una plataforma diseñada para conectar a personas con técnicos confiables y profesionales en su área. Nuestra misión es facilitar la búsqueda de servicios técnicos, desde electricistas hasta plomeros, asegurando que encuentres expertos calificados en minutos.
            </p>
            <p className="mb-6">
              Fundada en 2025, Sumee nació con la visión de simplificar la vida de nuestros usuarios. Creemos en la importancia de la confianza y la calidad, por eso todos nuestros técnicos pasan por un proceso de verificación para garantizar que cumplen con los más altos estándares.
            </p>
            <p>
              Únete a nuestra comunidad y descubre cómo Sumee puede ayudarte a resolver tus necesidades técnicas de manera rápida y eficiente.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}