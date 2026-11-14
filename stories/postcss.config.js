const postcssPresetEnv  = require('postcss-preset-env')
const postcssImport     = require('postcss-import')
const postcsseasings    = require('postcss-easings')
const importUrl         = require('postcss-import-url')

module.exports = {
  plugins: [
    importUrl(),
    postcssImport({
      path: 'app/css',
    }),
    postcsseasings(),
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': { edition: '2021', noIsPseudoSelector: true },
      },
    }),
  ]
}