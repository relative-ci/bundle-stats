module.exports = {
  rules: {
    'import/no-cycle': ['warn', { maxDepth: 1 }],
    'object-curly-newline': 'off',
    'function-paren-newline': 'off',
  },
};
