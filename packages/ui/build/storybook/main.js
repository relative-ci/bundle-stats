module.exports = {
  stories: ['../../src/**/*.stories.@(jsx|mdx)'],
  addons: ['@storybook/addon-knobs'],
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
};
