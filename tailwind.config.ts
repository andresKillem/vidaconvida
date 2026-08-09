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
        // Vida con Vida palette, taken from the logo (orange, teal and gold arcs on black)
        ink: {
          DEFAULT: '#16130F',
          soft: '#2A2520',
          muted: '#5C544B',
        },
        cream: '#FAF6EF',
        sand: '#F1E9DC',
        ember: {
          DEFAULT: '#E2622B',
          // Darker shade for small text on light backgrounds (meets WCAG AA contrast)
          deep: '#B84A18',
          soft: '#FBE3D6',
        },
        lagoon: {
          DEFAULT: '#2B8C88',
          deep: '#1E6663',
          soft: '#DDF0EE',
        },
        gold: {
          DEFAULT: '#F2B33D',
          soft: '#FCEFD2',
        },
        // Legacy brand keys kept for the /test page
        primary: {
          orange: '#E2622B',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        montserrat: ['var(--font-display)', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '62ch',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
