const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

module.exports = function tasks (on) {
  on(
    'file:preprocessor',
    createBundler({
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        })
      ]
    })
  )
}
