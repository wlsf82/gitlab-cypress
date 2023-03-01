const { defineConfig } = require('cypress')
const esbuildPreprocessor = require('./cypress/support/esbuild-preprocessor')

let accessToken

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    setupNodeEvents (on, config) {
      esbuildPreprocessor(on)
      on('task', {
        saveToken (token) {
          accessToken = token
          return accessToken
        },
        getToken () {
          if (accessToken) {
            return accessToken
          }
          return null
        }
      })
      return config
    }
  },
  fixturesFolder: false
})
