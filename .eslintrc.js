module.exports = {
  extends: 'airbnb',
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error', 
      { peerDependencies: true },
    ],
  },
};
