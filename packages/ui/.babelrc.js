module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-lodash',
    ['@simplyianm/babel-plugin-inline-react-svg', { noReactAutoImport: true, svgo: false }],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['require-context-hook'],
    },
  },
};
