const postcss = require('postcss');

module.exports = {
  stories: ['../../src/**/*.stories.@(jsx|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: postcss,
        },
      },
    },
    '@storybook/addon-essentials',
  ],
  webpackFinal: (config) => {
    // CSS module support - rely on css-loader auto option
    // eslint-disable-next-line no-param-reassign
    config.module.rules[3] = {
      test: /\.css/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    };

    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
