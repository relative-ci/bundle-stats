const path = require('path');
const webpackMerge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.config.common');

const projectDir = __dirname;
const distDir = path.resolve(projectDir, 'dist');

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: distDir,
      },
    ]),
  ],
});
