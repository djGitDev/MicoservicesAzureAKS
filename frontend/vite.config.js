import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/node': {
        target: 'http://node-service:7000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/node/, ''),
      },
      '/api/python': {
        target: 'http://python-service:7001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/python/, ''),
      },
    },
  },
});
