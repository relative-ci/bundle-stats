import { extractModulesPackagesCount } from '../modules-packages-count';

describe('Webpack/extract/extractModulesPackagesCount', () => {
  test('should return empty', () => {
    const actual = extractModulesPackagesCount();
    expect(actual).toEqual({ metrics: { packageCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = extractModulesPackagesCount(null, {
      metrics: {
        packages: {
          'package-a': {
            value: 50,
          },
          'package-b': {
            value: 10,
          },
          'package-c': {
            value: 10,
          },
        },
      },
    });

    expect(actual).toEqual({ metrics: { packageCount: { value: 3 } } });
  });
});
