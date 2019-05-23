const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (settings) => {
  const { isDevelopment } = settings;

  return {
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
            /storybook/,
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
}
