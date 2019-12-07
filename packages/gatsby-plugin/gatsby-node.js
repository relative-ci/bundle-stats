const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleStatsWebpackPlugin(options),
      ],
    });
  }
};
