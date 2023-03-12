module.exports = {
  globals: {
    __DEVELOPMENT__: true,
    __PRODUCTION__: true,
    __VERSION__: true,
  },
  rules: {
    'operator-linebreak': ['error', 'before', { overrides: { '&&': 'ignore' } }],
    'import/extensions': [
      'error',
      'never',
      {
        svg: 'always',
        png: 'always',
        css: 'always',
        json: 'alwaus',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        peerDependencies: true,
        devDependencies: [
          '**/*.stories.jsx',
          '**/__tests__/*.js',
          '**/storybook/*.js',
          '**/jest/*.js',
          '*.js',
        ],
      },
    ],
  },
};
