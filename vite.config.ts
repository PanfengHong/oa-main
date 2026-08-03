import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@my-oa/form': resolve(__dirname, '../oa-form/src/index.ts'),
      '@my-oa/flow': resolve(__dirname, '../oa-flow/src/index.ts'),
      '@my-oa/meeting': resolve(__dirname, '../oa-meeting/src/index.ts'),
      '@my-oa/task': resolve(__dirname, '../oa-task/src/index.ts'),
      '@my-oa/project': resolve(__dirname, '../oa-project/src/index.ts'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
