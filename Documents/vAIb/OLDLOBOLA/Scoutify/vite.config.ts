import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const rootDir = process.cwd();

export default defineConfig({
  plugins: [react()],
  root: path.resolve(rootDir, 'client'),
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'client/src'),
      '@shared': path.resolve(rootDir, 'shared')
    }
  },
  build: {
    outDir: path.resolve(rootDir, 'dist'),
    emptyOutDir: true,
  },
  server: {
    proxy: { '/api': 'http://localhost:5001' }
  }
})