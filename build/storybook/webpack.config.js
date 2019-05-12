const webpackMerge = require('webpack-merge');

const appCssConfig = require('../webpack/configs/css');
const appResolveConfig = require('../webpack/configs/resolve');
const appFilesConfig = require('../webpack/configs/files');

module.exports = ({ config }) => {
  // Remove other rules than js & md
  config.module.rules = config.module.rules.slice(0, 2); // eslint-disable-line no-param-reassign

  return webpackMerge.smart(
    config,
    appCssConfig,
    appResolveConfig,
    appFilesConfig,
  );
};
