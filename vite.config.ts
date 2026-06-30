import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Cloudflare Pages root domain (cafe-landing-page.pages.dev) ke liye base "/" chahiye.
// Cloudflare build environment me CF_PAGES=1 set hota hai. GitHub Pages subpath ke
// liye "/cafe-landing-page/" rakha gaya hai.
const base = process.env.CF_PAGES ? "/" : "/cafe-landing-page/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion"],
          gsap: ["gsap"],
          swiper: ["swiper"],
        },
      },
    },
  },
});
