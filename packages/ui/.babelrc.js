module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets: 'supports es6-module and last 2 versions',
      },
    ],
    '@babel/preset-react',
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
