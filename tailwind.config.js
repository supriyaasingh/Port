/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#142B3B', 900: '#0C1D29', 800: '#142B3B', 700: '#1E3C51', 600: '#2A4E66' },
        champagne: { DEFAULT: '#E9D6B8', light: '#F3E8D6' },
        mint: { DEFAULT: '#B9E4DC', light: '#DDF2EE' },
        ivory: '#FAF9F5',
        gold: { DEFAULT: '#C49B63', dark: '#A67F4A' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(20, 43, 59, 0.18)',
        lift: '0 30px 80px -25px rgba(20, 43, 59, 0.35)',
      },
    },
  },
  plugins: [],
};
