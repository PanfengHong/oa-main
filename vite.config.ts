import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('vite config loaded')
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@zdy-oa/auth': resolve(__dirname, '../oa-auth/src/index.ts'),
      '@zdy-oa/utils': resolve(__dirname, '../oa-utils/src/index.ts'),
      '@zdy-oa/form': resolve(__dirname, '../oa-form/src/index.ts'),
      '@zdy-oa/flow': resolve(__dirname, '../oa-flow/src/index.ts'),
      '@zdy-oa/designer': resolve(__dirname, '../oa-designer/src/index.ts'),
      '@zdy-oa/meeting': resolve(__dirname, '../oa-meeting/src/index.ts'),
      '@zdy-oa/task': resolve(__dirname, '../oa-task/src/index.ts'),
      '@zdy-oa/project': resolve(__dirname, '../oa-project/src/index.ts'),
      '@zdy-oa/chat': resolve(__dirname, '../oa-chat/src/index.ts'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🚀 Proxy request intercepted:', req.url);
          });
          proxy.on('error', (err, req, res) => {
            console.log('❌ Proxy error:', err.message);
          });
        },
      },
    },
  },
})