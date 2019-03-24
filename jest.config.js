module.exports = {
  clearMocks: true,
  setupFiles: ['<rootDir>/build/jest/register-context.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testEnvironment: 'node',
};
