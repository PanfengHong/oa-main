import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@zdy-oa/auth': resolve(__dirname, '../oa-auth/src/index.ts'),
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
    port: 5173,
    open: true,
  },
})