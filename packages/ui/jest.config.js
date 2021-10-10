module.exports = {
  clearMocks: true,
  globalSetup: '<rootDir>/build/jest/global-setup.js',
  setupFiles: ['core-js', 'jest-date-mock', '<rootDir>/build/jest/register-context.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^.+\\.md?$': 'markdown-loader-jest',
    '@bundle-stats/utils/lib-esm/(.+)': '@bundle-stats/utils/lib/$1',
  },
};
