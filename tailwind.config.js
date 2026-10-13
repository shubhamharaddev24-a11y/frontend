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
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        script: ["'Alex Brush'", "cursive"],
      },
      colors: {
        sphCream: "#F2EDE4",
        sphTaupe: "#1A1A1A",
        sphMuted: "#4A4A4A",
        sphAccent: "#76B900",
        sphBorder: "#E5E7EB",
        sphCardBg: "#FFFFFF",
        sphSurfaceSoft: "#F5F6F8",
        nvidiaGreen: "#76B900",
        nvidiaGreenHover: "#68A500",

        // Theme-aware brand system (driven by CSS variables in `src/styles/themes.css`)
        brandBg: "var(--bg-primary)",
        brandSurface: "var(--bg-surface)",
        brandSurfaceSoft: "var(--bg-surface-soft)",
        brandBorder: "var(--bg-border)",
        brandAccent: "var(--text-accent)",
        brandAccentSoft: "var(--text-accent-soft)",
        brandTextPrimary: "var(--text-primary)",
        brandTextMuted: "var(--text-muted)",
      },
    },
  },
  plugins: [],
}

