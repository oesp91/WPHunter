import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    fs: {
      cachedChecks: true
    }
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "src" },
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages"},
      { find: "@type", replacement: "/src/types"},
    ],
  },
});
