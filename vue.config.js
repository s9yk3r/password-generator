const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/_overrides.scss";` // loading bootstrap overriding scss
      }
    }
  }
})
