import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('src', 'index.js'),
      name: 'vue-button',
      formats: ['es', 'umd'],
      fileName: (format) => `vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'axios'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'Axios'
        },
      },
    },
  },
});
