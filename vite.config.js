import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  root: 'public',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    outDir: '../dist',
    sourcemap: false,
    emptyOutDir: true
  }
})
