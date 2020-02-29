const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = (settings) => {
  const { srcDir, distDir, isDevelopment, rootDir } = settings;

  return {
    context: srcDir,
    output: {
      path: distDir,
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/',
      hashDigestLength: 8,
    },
    resolve: {
      modules: ['node_modules', path.join(rootDir, 'node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: isDevelopment,
          },
        },
      ],
    },
    optimization: {
      minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    },
    devtool: 'source-map',
  };
};
