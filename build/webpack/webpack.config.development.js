const webpackMerge = require('webpack-merge');

const { publicDir } = require('../settings');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: publicDir,
  },
});
