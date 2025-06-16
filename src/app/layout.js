// src/app/layout.js
import "leaflet/dist/leaflet.css";
import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import ClientWhatsAppButton from "../components/ClientWhatsAppButton";
import Navbar from "../components/nav/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Sumee App - Encuentra Profesionales",
  description: "Conecta con profesionales verificados para tus proyectos en Sumee App.",
  keywords: "sumee app, profesionales, servicios, reservas, membresía",
  openGraph: {
    title: "Sumee App - Encuentra Profesionales",
    description: "Conecta con profesionales verificados para tus proyectos en Sumee App.",
    url: "https://sumeeapp.com",
    siteName: "Sumee App",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumee App - Encuentra Profesionales",
    description: "Conecta con profesionales verificados para tus proyectos en Sumee App.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" style={{ scrollBehavior: "smooth" }}>
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
      <body className="flex flex-col min-h-screen">
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DZCY3C3DEJ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DZCY3C3DEJ');
            `,
          }}
        />

        {/* Meta Pixel Script */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '9719096518211708');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=9719096518211708&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Navbar */}
        <Navbar />

        {/* Contenido principal */}
        <main className="flex-grow pt-20">{children}</main>

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