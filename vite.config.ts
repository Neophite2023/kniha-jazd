import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Nahraďte 'Kniha-jazd' názvom vášho repozitára na GitHub
export default defineConfig({
  plugins: [react()],
  base: '/Kniha-jazd/', 
  build: {
    outDir: 'dist',
  }
});