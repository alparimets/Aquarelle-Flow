/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FDFBF7',
        sage: { DEFAULT: '#8A9A86', dark: '#6E7F6A', light: '#E6EBE4' },
        slate: { body: '#334155' },
        terracotta: '#E07A5F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Lora', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
