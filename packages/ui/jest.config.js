module.exports = {
  clearMocks: true,
  setupFiles: [
    'core-js',
    '<rootDir>/build/jest/register-context.js',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^.+\\.md?$': 'markdown-loader-jest',
  },
  testEnvironment: 'node',
};
