export default {
  // Files Tailwind should scan to generate utility classes
  content: [
    "./index.html",                 // Include index.html
    "./src/**/*.{js,jsx}",          // Include all JS and JSX files inside src/
  ],
  theme: {
    extend: {}, // Custom theme extensions (e.g., colors, fonts) can go here
  },
  plugins: [], // You can add Tailwind plugins here (e.g., typography, forms)
};
