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
      sourcemap: true, // Lighthouse debugging
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            // React core
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("scheduler")
            ) {
              return "react";
            }

            // React Router
            if (id.includes("react-router-dom")) {
              return "router";
            }

            // TanStack Query
            if (id.includes("@tanstack/react-query")) {
              return "query";
            }

            // Radix UI (shadcn)
            if (id.includes("@radix-ui")) {
              return "radix";
            }

            // Lucide Icons
            if (id.includes("lucide-react")) {
              return "icons";
            }

            // Charts
            if (
              id.includes("recharts") ||
              id.includes("d3-")
            ) {
              return "charts";
            }

            // Rich editor (agar use karte ho)
            if (
              id.includes("quill") ||
              id.includes("@tiptap")
            ) {
              return "editor";
            }

            // PDF / heavy libs
            if (
              id.includes("pdfjs") ||
              id.includes("jspdf")
            ) {
              return "pdf";
            }

            // Remaining vendor libraries
            return "vendor";
          },
        },
      },
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