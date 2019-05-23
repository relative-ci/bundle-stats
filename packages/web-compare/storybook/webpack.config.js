const webpackMerge = require('webpack-merge');

const getCssConfig = require('../../../build/webpack/configs/css');
const getResolveConfig = require('../../../build/webpack/configs/resolve');
const getFilesConfig = require('../../../build/webpack/configs/files');
const settings = require('../settings');

module.exports = ({ config }) => {
  // Remove other rules than js & md
  config.module.rules = config.module.rules.slice(0, 2); // eslint-disable-line no-param-reassign

  return webpackMerge.smart(
    config,
    getCssConfig(settings),
    getResolveConfig(settings),
    getFilesConfig(settings),
  );
};
