import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'  // path 추가

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@type': path.resolve(__dirname, './src/types'),
    }
  }
});
