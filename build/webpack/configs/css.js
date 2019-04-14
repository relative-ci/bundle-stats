const CssExtractPlugin = require('mini-css-extract-plugin');

const { isDevelopment } = require('../../settings');

module.exports = {
  module: {
    rules: [
      // CSS transformations
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : CssExtractPlugin.loader,
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
        include: [
          /src/,
          /relative-ci\/ui/,
        ],
      },
    ],
  },
  plugins: [
    new CssExtractPlugin({
      filename: '[name].[contenthash:5].css',
      chunkFilename: '[id].[contenthash:5].css',
    }),
  ],
};
