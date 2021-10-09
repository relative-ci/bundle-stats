module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    ['@babel/preset-react', { pragma: 'h' }],
  ],
  plugins: ['babel-plugin-preact-require'],
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['babel-plugin-react-require'],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            modules: 'commonjs',
            corejs: 3,
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['babel-plugin-react-require', 'babel-plugin-require-context-hook'],
    },
  },
};
