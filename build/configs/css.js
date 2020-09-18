const path = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (settings) => {
  const { isDevelopment, rootDir } = settings;

  const include = [
    /src/,
    /bundle-stats\/ui/,
    path.join(__dirname, '../../packages/ui'), // required for linked packages
    /storybook/,
  ];

  const cssExtractRule = {
    loader: CssExtractPlugin.loader,
    options: {
      hmr: isDevelopment,
      reloadAll: true,
    },
  };

  const postCssRule = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.join(rootDir, 'postcss.config.js'),
      },
    },
  };

  return {
    module: {
      rules: [
        // CSS transformations
        {
          test: /\.module\.css$/,
          include,
          use: [
            cssExtractRule,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64:5]',
                },
              },
            },
            postCssRule,
          ],
        },
        {
          test: /^(?!.*module\.css$).*\.css$/,
          include,
          use: [
            cssExtractRule,
            {
              loader: 'css-loader',
              options: { modules: false },
            },
            postCssRule,
          ],
        },
      ],
    },
    plugins: [
      new CssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      }),
    ],
  };
};
