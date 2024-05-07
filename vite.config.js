import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://portfolio-backend-z9pa.onrender.com",
    },
  },
});

//https://portfolio-backend-z9pa.onrender.com
//http://localhost:8000