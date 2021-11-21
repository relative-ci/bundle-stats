const { merge } = require('webpack-merge');

const { publicDir } = require('./settings');
const standaloneCommonConfig = require('./webpack.config.common');

module.exports = merge(standaloneCommonConfig, {
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: publicDir,
  },
});
