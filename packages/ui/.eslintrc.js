module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { peerDependencies: true },
    ],
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  plugins: [
    'jest',
  ],
  env: {
    'jest/globals': true,
  },
};
