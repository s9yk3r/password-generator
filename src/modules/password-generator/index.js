import PasswordGenerator from './PasswordGenerator.vue'

export default {
  install: (app) => {
    app.component('PasswordGenerator', PasswordGenerator)
  }
}

export { PasswordGenerator }
