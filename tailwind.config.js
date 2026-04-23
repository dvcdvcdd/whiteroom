/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'wr-black': '#111111',
        'wr-gray': '#6B7280',
        'wr-border': '#E5E7EB',
        'wr-surface': '#F9FAFB',
        'wr-muted': '#F3F4F6',
        'wr-red': '#B91C1C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        'widest': '0.3em',
        'ultra': '0.5em',
      },
    },
  },
  plugins: [],
}