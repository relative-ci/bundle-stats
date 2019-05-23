const getResolveConfig = require('../../build/configs/resolve');
const settings = require('./settings');

module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    node: true
  },
  parser: 'babel-eslint',
  globals: {
    __DEVELOPMENT__: true,
    __PRODUCTION__: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: getResolveConfig(settings),
      },
    },
  },
  rules: {
    'operator-linebreak': ['error', 'before', { 'overrides': { '&&': 'ignore' } }],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
        png: 'always',
        css: 'always'
      }
    ],
    'import/prefer-default-export': 'off',
  },
};
