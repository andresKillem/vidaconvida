import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Vida con Vida Brand Colors
        primary: {
          orange: '#FF6B35',
          coral: '#FF8E72',
          teal: '#4ECDC4',
          yellow: '#FFD23F',
          gold: '#FFA500',
        },
        neutral: {
          'dark-navy': '#0A0A0A',
          'text-dark': '#333333',
          'text-light': '#666666',
          'light-gray': '#F5F5F5',
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #FF6B35, #FFD23F)',
        'gradient-logo': 'linear-gradient(135deg, #4ECDC4, #FF8E72, #FFD23F)',
        'gradient-reverse': 'linear-gradient(135deg, #FFD23F, #FF8E72, #4ECDC4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-in-left': 'slideInLeft 0.8s ease-in-out',
        'slide-in-right': 'slideInRight 0.8s ease-in-out',
        'pulse-float': 'pulseFloat 2s infinite',
        'float': 'float 20s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseFloat: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 10px 30px rgba(255, 107, 53, 0.4)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 10px 40px rgba(255, 107, 53, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) rotate(120deg) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;