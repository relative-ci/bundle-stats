const path = require('path');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

const projectDir = __dirname;
const publicDir = path.resolve(projectDir, 'public');

module.exports = webpackMerge(commonConfig, {
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: publicDir,
  },
});
