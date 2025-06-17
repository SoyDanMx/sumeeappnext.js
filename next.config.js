/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [
      ...config.externals,
      '@stripe/stripe-js',
      'stripe',
      'mercadopago',
    ];
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
module.exports = {
  publicRuntimeConfig: {
    api: {
      skipAuth: ['/api/healthcheck']
    }
  }
}