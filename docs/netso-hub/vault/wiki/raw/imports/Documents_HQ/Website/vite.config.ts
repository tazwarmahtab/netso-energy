import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vercel from 'vite-plugin-vercel/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vercel(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Three.js is loaded via CDN in index.html — prevent bundling it
  build: {
    rollupOptions: {
      external: ['three'],
    },
  },
})