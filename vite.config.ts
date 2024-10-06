import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Add any other dependencies you want to pre-bundle
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
