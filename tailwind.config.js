/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono2: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        chassis: {
          DEFAULT: '#1C1E23',
          2: '#26282E',
          3: '#33363D',
        },
        screen: '#0A0C0E',
        led: {
          DEFAULT: '#FFB020',
          dim: '#7A5420',
        },
      },
    },
  },
  plugins: [],
}
