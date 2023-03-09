const { defineConfig } = require('cypress')
const esbuildPreprocessor = require('./cypress/support/esbuild-preprocessor')
const tasks = require('./cypress/support/tasks')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost/',
    env: { hideXhr: true },
    setupNodeEvents (on, config) {
      esbuildPreprocessor(on)
      tasks(on)
      return config
    }
  }
})
