import { extractModulesCount } from '../modules-count';

describe('extractModulesCount', () => {
  test('should return empty', () => {
    const actual = extractModulesCount();
    expect(actual).toEqual({ metrics: { moduleCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = extractModulesCount(null, {
      metrics: {
        modules: {
          0: {
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
            },
          },
          1: {
            chunkNames: ['vendors'],
            modules: {
              'module-c': {
                name: 'module-c',
                value: 3000,
              },
            },
          },
        },
      },
    });

    expect(actual).toEqual({ metrics: { moduleCount: { value: 3 } } });
  });
});
