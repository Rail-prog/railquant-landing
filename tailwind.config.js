// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 600ms ease-out forwards'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
/* src/index.css */

/* smooth scroll for anchor links */
html {
  scroll-behavior: smooth;
}

/* Tailwind layers (already in your file) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Ensure page fills height nicely (you likely already have this) */
@layer base {
  html, body, #root { height: 100%; }
}
