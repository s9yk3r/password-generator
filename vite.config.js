import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { obfuscator } from 'rollup-obfuscator'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Obfuscator Config
 *
 * @see {@link https://github.com/javascript-obfuscator/javascript-obfuscator#preset-options}
 */
const obfuscatorConfig = Object.assign(
  {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
  },
  // Insert own setting.
  {
    stringArray: false // fix for vue inline stylesheet
  }
)

export default defineConfig({
  base: '/',
  plugins: [
    vue()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/modules/password-generator/index.js'),
      name: 'PasswordGenerator',
      fileName: (format) => `password-generator.${format}.js`,
      formats: ['es', 'umd']
    },
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    rollupOptions: {
      external: ['vue', 'bootstrap', '@fortawesome/vue-fontawesome'],
      output: {
        globals: {
          vue: 'Vue',
          bootstrap: 'Bootstrap'
        }
      },
      plugins: [
        obfuscator({
          global: true,
          ...obfuscatorConfig
        })
      ]
    },
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
