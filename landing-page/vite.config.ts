import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // babel({
    // babelConfig: {
    //   plugins: ["@babel/plugin-syntax-decorators"]
    // }
  // })
],
  build: {
    rollupOptions: {
      external: []
    },
  },
})