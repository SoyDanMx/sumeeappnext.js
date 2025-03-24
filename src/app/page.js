import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import MapSection from '../components/MapSection';
import ContactSection from '../components/ContactSection'; // Nueva importación
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <MapSection />
        <ContactSection /> {/* Nueva sección */}
      </main>
      <Footer />
    </div>
  );
}