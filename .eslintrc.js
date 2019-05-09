module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  globals: {
    'test': true,
    'expect': true,
  },
  rules: {
    'import/prefer-default-export': 0,
  }
};
