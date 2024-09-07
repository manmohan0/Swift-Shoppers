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
    postcss: './postcss.config.js',
    // postcss: './tailwind.config.js'
  },

})
