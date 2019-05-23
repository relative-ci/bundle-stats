module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { peerDependencies: true },
    ],
  },
  plugins: [
    'jest',
  ],
  env: {
    'jest/globals': true,
  },
};
