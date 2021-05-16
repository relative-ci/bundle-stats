const stylelint = require('stylelint');
const autoprefix = require('autoprefixer');

module.exports = () => ({
  plugins: [stylelint, autoprefix],
});
