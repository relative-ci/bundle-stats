module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'script',
  },
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/prefer-default-export': 0,
    strict: 0,
  },
};
