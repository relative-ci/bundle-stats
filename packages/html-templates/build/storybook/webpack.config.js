const path = require('path');
const { merge } = require('webpack-merge');

const getDefineConfig = require('../../../../build/configs/define');
const getResolveConfig = require('../../../../build/configs/resolve');
const getFilesConfig = require('../../../../build/configs/files');
const settings = require('../../settings');

module.exports = ({ config }) => {
  // Remove other rules than js & md
  config.module.rules = config.module.rules.slice(0, 2); // eslint-disable-line no-param-reassign

  return merge(
    config,
    getDefineConfig(settings),
    getFilesConfig(settings),
    getResolveConfig(settings),
    {
      resolve: {
        modules: [
          // Resolve dependencies to other @bundle-stats packages when linked
          path.join(__dirname, '../../node_modules'),
          path.join(__dirname, '../../ui/node_modules'),
          path.join(__dirname, '../../utils/node_modules'),
        ],
      },
    },
  );
};
