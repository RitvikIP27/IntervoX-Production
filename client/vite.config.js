import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      "@clerk/clerk-react": path.resolve(__dirname, "src/lib/mockClerk.js")
    }
  },

  server: {
    port: 5174,
    strictPort: true,
  }
})