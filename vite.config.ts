import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@entities": "/src/entities",
      "@feature": "/src/featur",
      "@shared": "/src/shared",
      "@widgets": "/src/widgets",
    },
  },
});
