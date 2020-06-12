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
  plugins: [
    'babel-plugin-preact-require',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
  ],
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
      plugins: [
        'babel-plugin-react-require',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
      ],
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
              node: 8,
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods',
        'babel-plugin-react-require',
        'babel-plugin-require-context-hook',
      ],
    },
  },
};
