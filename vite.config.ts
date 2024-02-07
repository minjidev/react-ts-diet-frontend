/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tools/tests/setupTests.ts',
    css: true,
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 5174,
  },
});
