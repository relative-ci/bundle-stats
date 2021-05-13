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
          'module-a': {
            name: 'module-a',
            size: 1000,
            chunks: [0],
          },
          'module-b': {
            name: 'module-b',
            size: 2000,
            chunks: [0],
          },
          'module-c': {
            name: 'module-c',
            size: 3000,
            chunks: [1],
          },
        },
      },
    });

    expect(actual).toEqual({ metrics: { moduleCount: { value: 3 } } });
  });
});
