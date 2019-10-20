module.exports = {
  presets: [
    ['@babel/preset-env', {
      loose: true,
      modules: false,
      useBuiltIns: 'usage',
      corejs: 3,
      targets: '> 0.25%, not dead',
    }],
  ],
  plugins: [
    'lodash',
  ],
};
