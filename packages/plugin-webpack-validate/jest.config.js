module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/__fixtures__/', '/node_modules/', '/lib/', '/lib-esm/', '/types/'],
  transform: {
    '.*.ts$': [
      'ts-jest',
      {
        tsConfig: 'tsconfig.lib.json',
      },
    ],
  },
};
