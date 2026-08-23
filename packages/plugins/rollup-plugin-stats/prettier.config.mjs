export default {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '**/*.{yml,yaml}',
      options: {
        singleQuote: false,
      },
    },
  ],
};
