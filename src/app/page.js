// src/app/page.js
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import MapSection from '../components/MapSection'; // Importar MapSection
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <MapSection /> {/* Agregar MapSection */}
      <ContactSection />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}