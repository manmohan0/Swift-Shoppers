import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./@/components")
    },
  },
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    proxy: {
      // Proxy all requests starting with /auth to the backend server
      '/auth': {
        target: 'http://localhost:3000',  // Replace with your backend server URL
        changeOrigin: true,               // Handle virtual hosted sites
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/auth')  // Optional: adjust the path if necessary
      },
      // You can add more proxies if you have other API routes
    },
    cors: {
      origin: 'http://localhost:3000', // Allow localhost:3000
      credentials: true,               // Allow credentials (cookies, etc.)
    },
  }
})