module.exports = {
  arrowParens: 'always',
  printWidth: 100,
  trailingComma: 'all',
  singleQuote: true,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
