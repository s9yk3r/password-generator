import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue(), vueDevTools()],
  base: command === 'build' ? '/password-generator/' : './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/modules/password-generator/index.js'),
      name: 'PasswordGenerator',
      fileName: (format: 'es' | 'umd') => `password-generator.${format}.js`,
      formats: ['es', 'umd'],
    },
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    rollupOptions: {
      external: [
        'vue',
        'bootstrap',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
      ],
      output: {
        globals: {
          vue: 'Vue',
          bootstrap: 'Bootstrap',
          '@fortawesome/vue-fontawesome': 'FontAwesomeIcon',
        },
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
