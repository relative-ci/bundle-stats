module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/polyfills.js'],
  testPathIgnorePatterns: [
    '/__fixtures__/',
    '/node_modules/',
    '/lib/',
    '/lib-esm/',
    '/types/',
  ],
};
