/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0A0E',
        coal: '#1A1218',
        cream: '#FFF5F1',
        muted: '#B9A3A8',
        rose: '#FF4D6D',
        blush: '#FFB3C6',
        gold: '#E9C48A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
