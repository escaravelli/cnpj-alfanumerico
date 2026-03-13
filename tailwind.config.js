/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Outfit', 'Inter', 'sans-serif'],
          mono: ['JetBrains Mono', 'Fira Code', 'monospace']
        },
        colors: {
          glow: '#6366f1',
          bgBase: '#09090b',
          bgCard: 'rgba(24, 24, 27, 0.65)',
          borderGlow: 'rgba(99, 102, 241, 0.15)',
        },
        animation: {
          'blob': 'blob 7s infinite',
          'fade-in': 'fadeIn 0.5s ease-out forwards',
          'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'shine': 'shine 4s linear infinite',
          'shimmer': 'shimmer 2s linear infinite',
          'spin-slow': 'spin 4s linear infinite',
        },
        keyframes: {
          blob: {
            '0%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
            '100%': { transform: 'translate(0px, 0px) scale(1)' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          shine: {
            to: { backgroundPosition: '200% center' }
          },
          shimmer: {
            from: { backgroundPosition: '0 0' },
            to: { backgroundPosition: '-200% 0' },
          }
        }
      },
    },
    plugins: [],
  }
