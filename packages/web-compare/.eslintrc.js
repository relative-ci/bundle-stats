module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  parser: 'babel-eslint',
  globals: {
    __DEVELOPMENT__: true,
    __PRODUCTION__: true,
    __VERSION__: true,
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
    'import/prefer-default-export': 'off',
  },
};
