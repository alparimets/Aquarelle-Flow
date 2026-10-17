/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FDFBF7', warm: '#F8F3EA' },
        sage: {
          DEFAULT: '#8A9A86',
          50: '#F3F6F2',
          100: '#E6EBE4',
          200: '#CDD7CA',
          300: '#B0BEAC',
          400: '#9AA996',
          500: '#8A9A86',
          600: '#6E7F6A',
          700: '#586853',
          800: '#46533F',
          dark: '#6E7F6A',
          light: '#E6EBE4',
        },
        terracotta: {
          DEFAULT: '#E07A5F',
          50: '#FCF3EF',
          100: '#F8E3DA',
          200: '#F1CBBB',
          300: '#E9AB93',
          400: '#E48D70',
          500: '#E07A5F',
          600: '#C2563C',
          700: '#9E4430',
        },
        slate: { body: '#334155' },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(110, 127, 106, 0.08), 0 4px 16px rgba(194, 86, 60, 0.06)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Lora', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
