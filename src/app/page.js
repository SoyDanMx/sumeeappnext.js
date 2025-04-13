// src/app/page.js
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ClientContactSection from '../components/ClientContactSection';
import Footer from '../components/Footer';
import Link from 'next/link';
import DynamicMapSection from '../components/DynamicMapSection';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <DynamicMapSection />
      <ClientContactSection />
      {/* Botón Únete como Pro / Join as Pro */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <Link href="/join-as-pro">
          <button
            className="bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors"
            aria-label="Únete como Pro en Sumee App"
          >
            Únete como Pro / Join as Pro
          </button>
        </Link>
      </section>
      <Footer />
    </main>
  );
}