import fixtures1 from '../../../__fixtures__/webpack-stats-1.extracted';
import { modulesWebpackTransform } from '../modules-webpack-transform';

describe('modulesWebpackTransform', () => {
  test('should return empty', () => {
    const actual = modulesWebpackTransform();
    expect(actual).toEqual({ modules: {} });
  });

  test('should return data', () => {
    const actual = modulesWebpackTransform(fixtures1);

    expect(actual).toEqual({
      modules: {
        1: {
          chunkNames: ['main'],
          modules: {
            'module-a': {
              name: 'module-a',
              value: 1000,
            },
            'module-b': {
              name: 'module-b',
              value: 2000,
            },
            'node_modules/package-a/index.js': {
              name: 'node_modules/package-a/index.js',
              value: 1000,
            },
            'node_modules/package-a/node_modules/package-c/index.js': {
              name: 'node_modules/package-a/node_modules/package-c/index.js',
              value: 1000,
            },
            'node_modules/package-b/index.js': {
              name: 'node_modules/package-b/index.js',
              value: 1000,
            },
            'node_modules/package-c/index.js': {
              name: 'node_modules/package-c/index.js',
              value: 1000,
            },
          },
        },
      },
    });
  });

  test('should return data with chunk names', () => {
    const actual = modulesWebpackTransform(fixtures1);

    expect(actual).toEqual({
      modules: {
        1: {
          chunkNames: ['main'],
          modules: {
            'module-a': {
              name: 'module-a',
              value: 1000,
            },
            'module-b': {
              name: 'module-b',
              value: 2000,
            },
            'node_modules/package-a/index.js': {
              name: 'node_modules/package-a/index.js',
              value: 1000,
            },
            'node_modules/package-a/node_modules/package-c/index.js': {
              name: 'node_modules/package-a/node_modules/package-c/index.js',
              value: 1000,
            },
            'node_modules/package-b/index.js': {
              name: 'node_modules/package-b/index.js',
              value: 1000,
            },
            'node_modules/package-c/index.js': {
              name: 'node_modules/package-c/index.js',
              value: 1000,
            },
          },
        },
      },
    });
  });
});
