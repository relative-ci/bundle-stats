import fixtures1 from '../../../__fixtures__/webpack-stats-1.extracted';
import { getModulesMetrics } from '../get-modules-metrics';

describe('getModulesMetrics', () => {
  test('should return empty', () => {
    const actual = getModulesMetrics();
    expect(actual).toEqual({});
  });

  test('should return data', () => {
    const actual = getModulesMetrics(fixtures1.modules);

    expect(actual).toEqual({
      1: {
        chunkNames: [],
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
    });
  });

  test('should return data with chunk names', () => {
    const actual = getModulesMetrics(fixtures1.modules, { chunks: fixtures1.chunks });

    expect(actual).toEqual({
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
        },
      },
    });
  });
});
