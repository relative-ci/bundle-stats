const process = require('process');
const webpack = require('webpack');

module.exports = (settings) => {
  const {
    srcDir, distDir, isProduction, isDevelopment,
  } = settings;

  return {
    context: srcDir,
    output: {
      path: distDir,
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      alias: {
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          use: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        __PRODUCTION__: JSON.stringify(isProduction),
        __DEVELOPMENT__: JSON.stringify(isDevelopment),
      }),
    ],
    devtool: 'source-map',
  };
};
