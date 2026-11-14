const postcssPresetEnv  = require('postcss-preset-env')
const postcsseasings    = require('postcss-easings')

module.exports = {
  plugins: [
    postcsseasings(),
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': { edition: '2021', noIsPseudoSelector: true },
        'logical-properties-and-values': false, 
        'prefers-color-scheme-query': false, 
        'gap-properties': false,
        'custom-properties': false,
        'dir-pseudo-class': false,
      }
    }),
  ]
}
