import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/FE23-js3-i3-david-vakhayev/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
