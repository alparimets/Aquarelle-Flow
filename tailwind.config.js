/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FAF7F2', card: '#FFFDF8', edge: '#E9E1D3' },
        ink: { DEFAULT: '#2D2A26', soft: '#6B645B' },
        sap: { DEFAULT: '#7A9A65', dark: '#4E6A3E' },
        rose: '#D46A7E',
        ochre: '#E2A856',
        cerulean: '#6BA3BE',
      },
      boxShadow: {
        card: '0 1px 1px rgba(45,42,38,0.06), 0 6px 12px rgba(45,42,38,0.08), 0 22px 40px -12px rgba(45,42,38,0.22)',
        lift: '0 2px 4px rgba(45,42,38,0.08), 0 12px 24px -8px rgba(45,42,38,0.2)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Lora', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
