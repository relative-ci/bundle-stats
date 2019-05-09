module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  global: {
    'test': true,
    'expect': true,
  },
  rules: {
    'import/prefer-default-export': 0,
  }
};
