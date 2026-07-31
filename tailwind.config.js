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
        viyaCream: "#F2EDE4",
        viyaTaupe: "#4A3E37",
        viyaMuted: "#88796E",
        viyaAccent: "#A67C6B",
        viyaBorder: "#E0D7CC",
        viyaCardBg: "#FFFFFF",
        viyaSurfaceSoft: "#FAF6F0",

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

