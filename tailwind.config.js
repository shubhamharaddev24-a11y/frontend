/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors (still usable if needed)
        cream: "#fef7ed",
        warmBrown: "#78350f",
        studioOrange: "#ea580c",

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

