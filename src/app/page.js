import Image from "next/image";
import Header from "./components/Header";
import ServicesSection from "./components/ServicesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import TechniciansSection from "./components/TechniciansSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Encuentra técnicos confiables cerca de ti / Find reliable pros near you
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Conecta con expertos en minutos para cualquier servicio que necesites.
          </p>
          <div className="flex justify-center gap-4">
            <input
              type="text"
              placeholder="¿Qué servicio necesitas? / What service do you need?"
              className="w-full max-w-md p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-6 py-4 rounded-lg hover:bg-opacity-90 transition-colors">
              Buscar / Search
            </button>
          </div>
        </div>
      </section>
      <ServicesSection />
      <HowItWorksSection />
      <TechniciansSection />
      <Footer />
    </main>
  );
}