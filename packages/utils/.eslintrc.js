module.exports = {
  extends: 'airbnb-base',
  env: {
    'jest/globals': true,
  },
  plugins: ['jest'],
  rules: {
    'import/prefer-default-export': 0,
  },
};
