import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React project
export default defineConfig({
  plugins: [react()], // Use the React plugin for JSX support
});
