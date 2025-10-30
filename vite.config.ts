import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    // proxy: {
    //   '/api': 'http://api-gateway:8080',
    // },
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src")}]
  }
})
