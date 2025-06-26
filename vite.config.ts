import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically open the report in your browser
      filename: 'dist/stats.html', // Output HTML file in the dist directory
      gzipSize: true, // Show GZIP sizes
      brotliSize: true, // Show Brotli sizes
    }),
  ],
})
