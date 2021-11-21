const path = require('path');
const { merge } = require('webpack-merge');

const getDefineConfig = require('../../../../build/configs/define');
const getResolveConfig = require('../../../../build/configs/resolve');
const settings = require('../../settings');

module.exports = ({ config }) => {
  // Enable css-modules
  // eslint-disable-next-line no-param-reassign
  config.module.rules[3].use[1].options = {
    modules: {
      auto: true,
    },
  };

  return merge(config, getDefineConfig(settings), getResolveConfig(settings), {
    resolve: {
      modules: [
        // Resolve dependencies to other @bundle-stats packages when linked
        path.join(__dirname, '../../node_modules'),
        path.join(__dirname, '../../ui/node_modules'),
        path.join(__dirname, '../../utils/node_modules'),
      ],
    },
  });
};
