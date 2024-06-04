import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:8000",
    },
  },
});

//https://portfolio-backend-z9pa.onrender.com
//http://localhost:8000