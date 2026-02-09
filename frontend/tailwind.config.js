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

        // Brand system for Shubham Photos Studio
        brandBg: "#050816",
        brandSurface: "#0b1020",
        brandSurfaceSoft: "#13182a",
        brandBorder: "#1f2937",
        brandAccent: "#f97316",      // warm orange
        brandAccentSoft: "#fed7aa",  // soft highlight
        brandTextPrimary: "#f9fafb",
        brandTextMuted: "#9ca3af",
      },
    },
  },
  plugins: [],
}

