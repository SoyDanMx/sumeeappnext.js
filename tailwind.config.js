/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7209CF",
        secondary: "#888888",
        purple: {
          50: "#faf5ff",
          600: "#7c3aed",
        },
        whatsapp: {
          DEFAULT: "#25D366", // Color principal de WhatsApp
          hover: "#20C35A",   // Color más oscuro para el hover
        },
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
      borderRadius: {
        button: "9999px",
      },
    },
  },
  plugins: [],
};