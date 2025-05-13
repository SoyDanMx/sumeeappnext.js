// src/app/layout.js
import "leaflet/dist/leaflet.css";
import "../styles/globals.css";
import Head from "next/head";
import ClientWhatsAppButton from '../components/ClientWhatsAppButton';
import Link from 'next/link';

export const metadata = {
  title: 'Sumee App - Únete a nuestra plataforma',
  description: 'Regístrate en Sumee App para unirte a nuestra lista de espera y descubre nuestros servicios.',
  keywords: 'sumee app, lista de espera, membresía, servicios, contacto',
  openGraph: {
    title: 'Sumee App - Únete a nuestra plataforma',
    description: 'Regístrate en Sumee App para unirte a nuestra lista de espera y descubre nuestros servicios.',
    url: 'https://sumeeapp.com',
    siteName: 'Sumee App',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumee App - Únete a nuestra plataforma',
    description: 'Regístrate en Sumee App para unirte a nuestra lista de espera y descubre nuestros servicios.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" style={{ scrollBehavior: 'smooth' }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css"
          rel="stylesheet"
        />
      </Head>
      <body className="flex flex-col min-h-screen pt-16">
        {/* Contenido principal */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <h2 className="text-2xl font-bold">Sumee</h2>
            </div>
            <p className="footer-text">© 2025 Sumee App. Todos los derechos reservados.</p>
            <div className="footer-links">
              <Link href="/about" className="footer-link">Acerca de</Link>
              <Link href="/contact" className="footer-link">Contacto</Link>
              <Link href="/privacy" className="footer-link">Privacidad</Link>
              <Link href="/terms" className="footer-link">Términos</Link>
            </div>
          </div>
        </footer>

        {/* Botón de WhatsApp */}
        <ClientWhatsAppButton />
      </body>
    </html>
  );
}