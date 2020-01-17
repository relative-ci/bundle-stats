module.exports = {
  testEnvironment: 'node',
  setupFiles: [
    'core-js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/lib-esm/',
  ],
};
