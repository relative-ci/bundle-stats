module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        node: '8',
      },
    }],
  ],
  plugins: [
    'babel-plugin-lodash',
  ],
};
