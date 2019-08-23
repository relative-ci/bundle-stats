const { BundleStatsWebpackPlugin } = require('bundle-stats');

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleStatsWebpackPlugin(options),
      ],
    });
  }
};
