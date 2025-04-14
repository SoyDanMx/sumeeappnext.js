/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@stripe/stripe-js'] = require.resolve('@stripe/stripe-js');
    config.resolve.alias['stripe'] = require.resolve('stripe');
    config.resolve.alias['mercadopago'] = require.resolve('mercadopago');
    return config;
  },
};

module.exports = nextConfig;