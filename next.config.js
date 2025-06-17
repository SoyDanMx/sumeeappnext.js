/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Desactivar ESLint durante builds solo si es necesario; mejor corregir errores
    ignoreDuringBuilds: false, // Cambiado a false para detectar errores
  },
  webpack: (config) => {
    // Excluir bibliotecas del bundle (asegúrate de cargarlas dinámicamente si las usas)
    config.externals = [
      ...config.externals,
      '@stripe/stripe-js',
      'stripe',
      'mercadopago',
    ];
    return config;
  },
  publicRuntimeConfig: {
    api: {
      skipAuth: ['/api/healthcheck'],
    },
  },
};

module.exports = nextConfig;