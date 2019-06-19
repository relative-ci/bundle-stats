module.exports = {
  presets: [
    ['@babel/preset-env', {
      loose: true,
      modules: false,
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-lodash',
    'babel-plugin-inline-react-svg',
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: 3,
        }],
        '@babel/preset-react',
      ],
      plugins: [
        'require-context-hook',
      ],
    },
  },
};
