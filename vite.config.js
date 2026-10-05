import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ai-text-summarizer-backend-0vfv.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
