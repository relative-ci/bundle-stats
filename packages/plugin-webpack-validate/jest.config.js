module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/__fixtures__/', '/node_modules/', '/lib/'],
  transform: {
    '.*.ts$': [
      'ts-jest',
      {
        tsConfig: 'tsconfig.cjs.json',
      },
    ],
  },
};
