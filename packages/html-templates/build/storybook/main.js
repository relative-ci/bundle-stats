const { dirname, join } = require('path');

function getAbsolutePath(value) {
  return dirname(join(__dirname, '../../../../node_modules', value, 'package.json'));
}

module.exports = {
  framework: getAbsolutePath('@storybook/react-webpack5'),
  stories: ['../../src/**/*.stories.@(jsx|tsx|mdx)'],
  addons: [getAbsolutePath('@storybook/addon-webpack5-compiler-babel')],

  docs: {
    autodocs: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
