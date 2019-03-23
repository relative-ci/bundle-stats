const CssExtractPlugin = require('mini-css-extract-plugin');

const { isDevelopment } = require('../../settings');

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
              localIdentName: isDevelopment
                ? '[path][name]__[local]'
                : '[hash:base64:5]',
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
        use: isDevelopment ? 'style-loader' : CssExtractPlugin.loader,
      },
    ],
  },
  plugins: [
    new CssExtractPlugin({
      filename: '[name].[contenthash:5].css',
    }),
  ],
};
