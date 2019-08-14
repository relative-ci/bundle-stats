/* eslint-env node */
const getResolveConfig = require('../../../build/configs/resolve');

module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: false,
    'jest/globals': true,
  },
  plugins: ['jest'],
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      webpack: {
        config: getResolveConfig(),
      },
    },
  },
  rules: {
    'operator-linebreak': ['error', 'before', { overrides: { '&&': 'ignore' } }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
        png: 'always',
        css: 'always',
        json: 'always',
      },
    ],
    'import/no-unresolved': ['error', {
      ignore: ['@bundle-stats'],
    }],
    'import/prefer-default-export': 'off',
    'react/no-unknown-property': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/sort-comp': 'off',
    'react/destructuring-assignment': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
