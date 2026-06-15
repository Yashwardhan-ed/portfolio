/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        surface: {
          0: '#0a0a0f',
          1: '#111118',
          2: '#18181f',
          3: '#22222b',
          4: '#2c2c38',
        },
        accent: {
          DEFAULT: '#7c6af7',
          light: '#a594ff',
          muted: '#5b52c9',
        },
        text: {
          primary: '#f0effe',
          secondary: '#9d9ab8',
          muted: '#6b6884',
        },
        border: {
          DEFAULT: '#2c2c38',
          light: '#3a3a4a',
        },
      },
    },
  },
  plugins: [],
}
