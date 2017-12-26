const webpackMerge = require('webpack-merge');

const appCssConfig = require('../webpack/css');

module.exports = storybookConfig => webpackMerge.smart(
  storybookConfig,
  appCssConfig,
  {
    resolve: {
      extensions: ['.jsx', '.json', '.js'],
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      },
    },
  },
);
