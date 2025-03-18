import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4004,
    watch: {
      usePolling: true,
      interval: 100, // Keep polling interval fast
    },
    hmr: {
      clientPort: 4004,
      host: "localhost",
      overlay: true, // Shows errors directly in browser
    },
  },
  // Optimize dev performance
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle common dependencies
  },
  // Ensure sourcemaps are fast
  build: {
    sourcemap: true,
    // Minimize asset size for faster loads
    assetsInlineLimit: 0,
  },
});
