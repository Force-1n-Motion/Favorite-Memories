const cssnano = require('cssnano');

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {

      },
    ],
    cssnano({ preset: 'default' })
  ],
}