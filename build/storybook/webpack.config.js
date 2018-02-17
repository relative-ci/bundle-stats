const webpackMerge = require('webpack-merge');

const appCssConfig = require('../webpack/configs/css');
const appResolveConfig = require('../webpack/configs/resolve');

module.exports = storybookConfig => webpackMerge.smart(
  storybookConfig,
  appCssConfig,
  appResolveConfig,
);
