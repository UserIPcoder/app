/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        blob: "blob, 7s infinite",
        'shooting-star': 'shooting-star 3s linear infinite',
        'twinkle': 'twinkle 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 20s linear infinite reverse',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        'shooting-star': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(100vw)', opacity: '0' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};