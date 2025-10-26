/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: '#000000',
        gray: {
          100: '#F7F7F7',
          200: '#E5E5E5',
          300: '#D1D1D1',
          500: '#737373',
          700: '#404040',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
};
