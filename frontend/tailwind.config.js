/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#f2fcf2",
        "surface": "#f2fcf2",
        "primary-container": "#00ed64",
        "primary": "#006e2a",
        "on-surface": "#1b361f",
        "on-surface-variant": "#abae89",
        "surface-container": "#e6f1e1",
        "surface-container-low": "#ecf7e7",
        "surface-container-high": "#e0ebdc",
        "surface-container-highest": "#dbe6d6",
        "surface-container-lowest": "#ffffff",
        "outline": "#6b7b69",
        "outline-variant": "#bacbb7",
        "error": "#ba1a1a",
        "on-primary-container": "#1b361f",
        "brand-dark": "#1b361f"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "full": "9999px"
      },
      maxWidth: {
        "container-max": "1200px"
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "48px",
        "gutter": "24px"
      },
      fontFamily: {
        sans: ["'Hanken Grotesk'", "sans-serif"],
        headline: ["'Plus Jakarta Sans'", "sans-serif"]
      },
      boxShadow: {
        'neo': '20px 20px 40px rgba(27,54,31,0.08), -20px -20px 40px rgba(255,255,255,0.9)',
        'neo-sm': '8px 8px 16px rgba(27,54,31,0.06), -8px -8px 16px rgba(255,255,255,0.9)',
        'neo-button': '10px 10px 20px rgba(27,54,31,0.15), -10px -10px 20px rgba(255,255,255,0.8)',
        'neo-inset': 'inset 6px 6px 12px rgba(27,54,31,0.15), inset -6px -6px 12px rgba(255,255,255,0.6)',
      },
      keyframes: {
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        }
      },
      animation: {
        'organic-blob': 'morph 8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}