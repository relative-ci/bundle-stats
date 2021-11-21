const postcss = require('postcss');

module.exports = {
  stories: ['../../src/**/*.stories.jsx'],
  addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
};
