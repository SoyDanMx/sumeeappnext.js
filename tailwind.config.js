/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#7209CF',
          secondary: '#888888',
        },
        borderRadius: {
          'none': '0px',
          'sm': '4px',
          'DEFAULT': '8px',
          'md': '12px',
          'lg': '16px',
          'xl': '20px',
          '2xl': '24px',
          '3xl': '32px',
          'full': '9999px',
          'button': '8px',
        },
      },
    },
    plugins: [],
  };