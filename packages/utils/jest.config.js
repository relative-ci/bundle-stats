module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  setupFiles: ['core-js'],
  testPathIgnorePatterns: [
    '/__fixtures__/',
    '/node_modules/',
    '/lib/',
    '/lib-esm/',
    '/types/',
  ],
};
