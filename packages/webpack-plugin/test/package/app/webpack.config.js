const { BundleStatsWebpackPlugin } = require('../../../');

module.exports = {
  mode: 'production',
  context: __dirname,
  plugins: [
    new BundleStatsWebpackPlugin(),
  ],
};
