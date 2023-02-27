const { defineConfig } = require('cypress')

let accessToken

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    setupNodeEvents (on, config) {
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
