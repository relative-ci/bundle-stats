module.exports = {
  clearMocks: true,
  globals: {
    __VERSION__: '0.0.1',
  },
  globalSetup: '<rootDir>/build/jest/global-setup.js',
  setupFiles: ['core-js', 'jest-date-mock', '<rootDir>/build/jest/register-context.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    'Fixtures/(.*)$': '<rootDir>/../../fixtures/$1',
    '@bundle-stats/(.*)/lib-esm/(.*)': '@bundle-stats/$1/lib/$2',
    '^preact$': '<rootDir>/../../node_modules/preact/dist/preact.js',
  },
  testEnvironment: 'jsdom',
};
