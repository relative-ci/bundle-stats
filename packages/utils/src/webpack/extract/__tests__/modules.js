import fixtures from '../../../../__fixtures__/webpack-stats-1.extracted';
import fixturesWithConcatenatedModules from '../../../../__fixtures__/webpack-stats-3.extracted';
import { extractModules } from '../modules';

describe('Webpack/extract/modules', () => {
  test('should return empty', () => {
    const actual = extractModules();
    expect(actual).toEqual({ metrics: { modules: {} } });
  });

  test('should extract modules', () => {
    const actual = extractModules(fixtures);

    expect(actual).toEqual({
      metrics: {
        modules: {
          'module-a': {
            name: 'module-a',
            value: 1000,
            chunkIds: ['1'],
          },
          'module-b': {
            name: 'module-b',
            value: 2000,
            chunkIds: ['1'],
          },
          'node_modules/package-a/index.js': {
            name: 'node_modules/package-a/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
          'node_modules/package-a/node_modules/package-c/index.js': {
            name: 'node_modules/package-a/node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
          'node_modules/package-b/index.js': {
            name: 'node_modules/package-b/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
          'node_modules/package-c/index.js': {
            name: 'node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
        },
      },
    });
  });

  test('should extract concantenated modules', () => {
    const actual = extractModules(fixturesWithConcatenatedModules);

    expect(actual).toEqual({
      metrics: {
        modules: {
          'module-a': {
            name: 'module-a',
            value: 1000,
            chunkIds: ['1'],
          },
          './module-b': {
            name: './module-b',
            value: 500,
            chunkIds: ['1'],
          },
          './module-b-1': {
            name: './module-b-1',
            value: 1000,
            chunkIds: ['1'],
          },
          './module-b-2': {
            name: './module-b-2',
            value: 500,
            chunkIds: ['1'],
          },
          'node_modules/package-a/index.js': {
            name: 'node_modules/package-a/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
          'node_modules/package-a/node_modules/package-c/index.js': {
            name: 'node_modules/package-a/node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
          'node_modules/package-b/index.js': {
            name: 'node_modules/package-b/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
          'node_modules/package-c/index.js': {
            name: 'node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
          },
        },
      },
    });
  });
});
