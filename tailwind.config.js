/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      /* 🎨 COLORS (Luxury Theme) */
      colors: {
        primary: "#111827",   // Dark (text)
        secondary: "#374151", // Gray
        accent: "#F59E0B",    // Gold
        dark: "#0f172a",      // Deep dark
        darker: "#020617",    // Navbar/Footer
        light: "#f9fafb",     // Background
        lighter: "#ffffff",   // Cards
      },

      /* ✍️ FONTS */
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['Roboto', 'sans-serif'],
        brush: ['cursive'], // optional signature style
      },

      /* 🌟 BOX SHADOWS */
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)",
        elegant: "0 20px 40px rgba(0,0,0,0.15)",
      },

      /* 🔥 GRADIENTS */
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F59E0B, #fbbf24)',
        'dark-gradient': 'linear-gradient(to right, #020617, #0f172a)',
      },

      /* 🎯 BORDER RADIUS */
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },

      /* 🎬 ANIMATIONS */
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },

      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        fadeIn: "fadeIn 0.6s ease-in-out",
      },

    },
  },
  plugins: [],
}