// src/app/layout.js
import "leaflet/dist/leaflet.css";
import "../styles/globals.css";
import Head from "next/head";
import ClientWhatsAppButton from '../components/ClientWhatsAppButton';

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
      <body className="pt-16">
        {children}
        <ClientWhatsAppButton />
      </body>
    </html>
  );
}