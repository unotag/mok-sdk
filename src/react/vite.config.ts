import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve('src', 'component/index.ts'),
      name: 'react',
      formats: ['es', 'umd'],
      fileName: (format) => `react.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  }
})
