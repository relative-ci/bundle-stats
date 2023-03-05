import fixtures from '../../../../__fixtures__/webpack-stats-1.extracted';
import fixturesWithConcatenatedModules from '../../../../__fixtures__/webpack-stats-3.extracted';
import { extractModules } from '../modules';

describe('Webpack/extract/modules', () => {
  test('should return empty', () => {
    const actual = extractModules();
    expect(actual).toEqual({
      metrics: {
        duplicateCode: { value: 0 },
        duplicateModulesCount: { value: 0 },
        modules: {},
        moduleCount: { value: 0 },
      },
    });
  });

  test('should extract modules', () => {
    const actual = extractModules(fixtures);

    expect(actual).toEqual({
      metrics: {
        duplicateCode: { value: 0 },
        duplicateModulesCount: { value: 0 },
        modules: {
          'module-a': {
            name: 'module-a',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'module-b': {
            name: 'module-b',
            value: 2000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-a/index.js': {
            name: 'node_modules/package-a/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-a/node_modules/package-c/index.js': {
            name: 'node_modules/package-a/node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-b/index.js': {
            name: 'node_modules/package-b/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-c/index.js': {
            name: 'node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-d/index.js': {
            name: 'node_modules/package-d/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
        },
        moduleCount: { value: 7 },
      },
    });
  });

  test('should extract concantenated modules', () => {
    const actual = extractModules(fixturesWithConcatenatedModules);

    expect(actual).toEqual({
      metrics: {
        duplicateCode: { value: 7.5 },
        duplicateModulesCount: { value: 2 },
        modules: {
          'module-a': {
            name: 'module-a',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          './module-b': {
            name: './module-b',
            value: 500,
            chunkIds: ['1'],
            duplicated: false,
          },
          './module-b-1': {
            name: './module-b-1',
            value: 400,
            chunkIds: ['1'],
            duplicated: false,
          },
          './module-b-c.css': {
            name: './module-b-c.css',
            value: 500,
            chunkIds: ['1', '2'],
            duplicated: true,
          },
          './module-b-c.js': {
            name: './module-b-c.js',
            value: 100,
            chunkIds: ['1', '2'],
            duplicated: true,
          },
          './module-c': {
            name: './module-c',
            value: 500,
            chunkIds: ['2'],
            duplicated: false,
          },
          './module-c-1': {
            name: './module-c-1',
            value: 400,
            chunkIds: ['2'],
            duplicated: false,
          },
          'node_modules/package-a/index.js': {
            name: 'node_modules/package-a/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-a/node_modules/package-c/index.js': {
            name: 'node_modules/package-a/node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-b/index.js': {
            name: 'node_modules/package-b/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'node_modules/package-c/index.js': {
            name: 'node_modules/package-c/index.js',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
        },
        moduleCount: { value: 13 },
      },
    });
  });

  test('should extract duplicateCode and duplicateModulesCount metrics', () => {
    const actual = extractModules({
      ...fixtures,
      modules: [
        {
          name: 'module-a',
          size: 1000,
          chunks: [1],
        },
        {
          name: 'module-b',
          size: 2000,
          chunks: [1],
        },
        {
          name: 'module-c',
          size: 5000,
          chunks: [1, 2],
        },
      ],
    });

    expect(actual).toEqual({
      metrics: {
        duplicateCode: { value: 38.46 },
        duplicateModulesCount: { value: 1 },
        modules: {
          'module-a': {
            name: 'module-a',
            value: 1000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'module-b': {
            name: 'module-b',
            value: 2000,
            chunkIds: ['1'],
            duplicated: false,
          },
          'module-c': {
            name: 'module-c',
            value: 5000,
            chunkIds: ['1', '2'],
            duplicated: true,
          },
        },
        moduleCount: { value: 4 },
      },
    });
  });
});
