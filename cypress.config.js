const { defineConfig } = require('cypress')

let gitlab_access_token

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    setupNodeEvents(on, config) {
      on('task', {
        saveToken(token) {
          gitlab_access_token = token
          return gitlab_access_token
        },
        getToken() {
          if (gitlab_access_token) {
            return gitlab_access_token
          }
          return null
        },
      })
      return config
    },
  },
  fixturesFolder: false,
})
