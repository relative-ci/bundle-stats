const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');

module.exports = {
  mode: 'production',
  context: __dirname,
  plugins: [new BundleStatsWebpackPlugin()],
};
