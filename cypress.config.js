const { defineConfig } = require('cypress')
const esbuildPreprocessor = require('./cypress/support/esbuild-preprocessor')
const tasks = require('./cypress/support/tasks')

module.exports = defineConfig({
  projectId: 'vxwq6z',
  e2e: {
    baseUrl: 'http://localhost/',
    setupNodeEvents (on, config) {
      esbuildPreprocessor(on)
      tasks(on)
      return config
    }
  },
  retries: {
    runMode: 2,
    openMode: 0
  }
})
