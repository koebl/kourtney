import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@rollup/plugin-yaml'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), yaml()],
  base: '/', // Change this if deploying to a subdirectory
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@data': resolve(__dirname, 'data')
    }
  }
})