/** @type {import('tailwindcss').Config} */
export default {
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
        sphAccent: "#A67C6B",
        sphBorder: "#E0D7CC",
        sphCardBg: "#FFFFFF",
        sphSurfaceSoft: "#FAF6F0",

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

