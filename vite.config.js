import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  envDir: './', // This tells Vite where to look for .env files
  envPrefix: 'VITE_', // Only variables starting with VITE_ will be exposed
  build: {
    outDir: '../dist'
  },
  // Optional: Add logging to debug
  define: {
    __DEV__: JSON.stringify(true)
  }
});