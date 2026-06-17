import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig(({ mode }) => {

  const isDev = mode === "development";

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
      proxy: {
        "/api": {
          target: isDev
            ? "http://localhost:5000"
            : "https://www.indiaipo.in",
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target: isDev
            ? "http://localhost:5000"
            : "https://www.indiaipo.in",
          changeOrigin: true,
          secure: false,
        },
      },
    },


    build: {
      sourcemap: false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
    },

    plugins: [
      react(),
      mode === "development" && componentTagger(),
      // cssInjectedByJsPlugin(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});