const webpackMerge = require('webpack-merge');

const appCssConfig = require('../webpack/configs/css');
const appResolveConfig = require('../webpack/configs/resolve');
const appFilesConfig = require('../webpack/configs/files');

module.exports = storybookConfig => webpackMerge.smart(
  storybookConfig,
  appCssConfig,
  appResolveConfig,
  appFilesConfig,
);
