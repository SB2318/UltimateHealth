import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vice: {
          pink: "#ff007f",
          magenta: "#ff0055",
          cyan: "#00f0ff",
          purple: "#9d00ff",
          yellow: "#ffea00",
          orange: "#ff5500",
          dark: "#0b0b12",
          card: "#141424",
          border: "#262640",
          neonGreen: "#39ff14",
        },
      },
      fontFamily: {
        vice: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        stencil: ['"Impact"', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 15px rgba(255, 0, 127, 0.6), 0 0 30px rgba(255, 0, 127, 0.3)',
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.6), 0 0 30px rgba(0, 240, 255, 0.3)',
        'neon-yellow': '0 0 15px rgba(255, 234, 0, 0.6), 0 0 30px rgba(255, 234, 0, 0.3)',
        'neon-purple': '0 0 15px rgba(157, 0, 255, 0.6), 0 0 30px rgba(157, 0, 255, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(255,0,127,0.8))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.9))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;