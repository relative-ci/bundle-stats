const stylelint = require('stylelint');
const autoprefix = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = (ctx) => ({
  plugins: [
    stylelint,
    autoprefix,
    ...(ctx.env === 'production' ? [cssnano] : []),
  ],
});
