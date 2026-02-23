/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
          cormorant: ['"Cormorant Garamond"', 'serif'],
          playfair: ['"Playfair Display"', 'serif'],
        },
        colors: {
          gold: {
            50: '#FDF8E8',
            100: '#F9EDCC',
            200: '#F0D78A',
            300: '#E5BF4E',
            400: '#D4A930',
            500: '#C9A961',
            600: '#B8860B',
            700: '#8B6914',
            800: '#5C4610',
            900: '#2E230A',
          },
          cream: {
            50: '#FFFEF7',
            100: '#FEFCF0',
            200: '#FDF7E0',
          },
          burgundy: {
            700: '#722F37',
            800: '#5A252C',
            900: '#3D1A1E',
          },
        },
        animation: {
          'fade-in': 'fadeIn 1s ease forwards',
          'fade-in-up': 'fadeInUp 0.8s ease forwards',
          'slide-in-left': 'slideInLeft 0.8s ease forwards',
          'slide-in-right': 'slideInRight 0.8s ease forwards',
          'scale-in': 'scaleIn 0.6s ease forwards',
          'marquee': 'marquee 40s linear infinite',
          'glow-pulse': 'glowPulse 3s ease-in-out infinite',
          'float': 'float 6s ease-in-out infinite',
          'spin-slow': 'spin 8s linear infinite',
          'baton': 'batonSwing 1.2s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(40px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-60px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          slideInRight: {
            '0%': { opacity: '0', transform: 'translateX(60px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          scaleIn: {
            '0%': { opacity: '0', transform: 'scale(0.9)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          marquee: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          glowPulse: {
            '0%, 100%': { boxShadow: '0 0 20px rgba(201,169,97,0.15)' },
            '50%': { boxShadow: '0 0 40px rgba(201,169,97,0.3)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-12px)' },
          },
          batonSwing: {
            '0%': { transform: 'rotate(-15deg)' },
            '50%': { transform: 'rotate(15deg)' },
            '100%': { transform: 'rotate(-15deg)' },
          },
        },
      },
    },
    plugins: [],
  };
