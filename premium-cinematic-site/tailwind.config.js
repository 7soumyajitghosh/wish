/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        coal: '#121214',
        cream: '#F4F1EA',
        muted: '#9B9B93',
        accent: '#D9FF3F',
        ember: '#1A1B10',
      },
      fontFamily: {
        display: ['Anton', 'Arial Black', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
