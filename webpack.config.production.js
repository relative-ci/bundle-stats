const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [],
});
