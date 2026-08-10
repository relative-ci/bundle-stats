const { dirname, join } = require('path');

function getAbsolutePath(value) {
  return dirname(join(__dirname, '../../../../node_modules', value, 'package.json'));
}

module.exports = {
  framework: getAbsolutePath('@storybook/react-webpack5'),
  stories: ['../../src/**/*.stories.@(jsx|tsx|mdx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    {
      name: getAbsolutePath('@storybook/addon-styling-webpack'),
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  // Keep the default import style used across the codebase
                  // (`import css from './x.module.css'`) working, and preserve the
                  // original class names (`as-is`) since they are accessed via
                  // bracket notation, e.g. `css['tile-NO_CHANGE']`.
                  modules: {
                    auto: true,
                    namedExport: false,
                    exportLocalsConvention: 'asIs',
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
