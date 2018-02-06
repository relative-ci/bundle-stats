const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  module: {
    rules: [
      // CSS transformations
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: isDevelopment ?
                '[path][name]__[local]' :
                '[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },

      // css delivery
      {
        test: /\.css$/,
        enforce: 'post',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:5].css',
      disable: isDevelopment,
    }),
  ],
};
