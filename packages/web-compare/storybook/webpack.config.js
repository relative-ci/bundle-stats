const webpackMerge = require('webpack-merge');

const getCssConfig = require('../../../build/configs/css');
const getDefineConfig = require('../../../build/configs/define');
const getFilesConfig = require('../../../build/configs/files');
const getResolveConfig = require('../../../build/configs/resolve');
const settings = require('../settings');

module.exports = ({ config }) => {
  // Remove other rules than js & md
  config.module.rules = config.module.rules.slice(0, 2); // eslint-disable-line no-param-reassign

  return webpackMerge.smart(
    config,
    getCssConfig(settings),
    getDefineConfig(settings),
    getFilesConfig(settings),
    getResolveConfig(settings),
  );
};
