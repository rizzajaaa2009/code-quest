/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'quest-dark': '#0B0716',
        'quest-purple': '#1A1033',
        'quest-violet': '#6A3DFF',
        'quest-gold': '#FFD84D',
        'quest-surface': '#2D1B4E',
        'quest-text': '#E8E4F0',
        'quest-muted': '#9B8FC7',
      },
      fontFamily: {
        quest: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gold-burst': 'gold-burst 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(106, 61, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(106, 61, 255, 0.6)' },
        },
        'gold-burst': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
