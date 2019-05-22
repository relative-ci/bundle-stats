module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/prefer-default-export': 0,
  }
};
