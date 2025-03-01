/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lumon': {
          white: '#ffffff',
          blue: '#45a6cf',
          dark: '#013b6b',
          neon: '#20f4f5',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 5px rgba(32, 244, 245, 0.2), 0 0 20px rgba(32, 244, 245, 0.1)',
        'inner-neon': 'inset 0 0 5px rgba(32, 244, 245, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-pulse': 'border-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(32, 244, 245, 0.2)' },
          '50%': { borderColor: 'rgba(32, 244, 245, 0.1)' },
        }
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(to right, rgba(32, 244, 245, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(32, 244, 245, 0.03) 1px, transparent 1px)`,
      },
    },
  },
  plugins: [],
};