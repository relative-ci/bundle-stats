import { extractModulesPackagesDuplicate } from '../modules-packages-duplicate';

describe('Webpack/extract/extractModulesPackagesDuplicate', () => {
  test('should return empty', () => {
    const actual = extractModulesPackagesDuplicate(null, null);
    expect(actual).toEqual({
      metrics: { duplicatePackagesCount: { value: 0 } },
    });
  });

  test('should return data', () => {
    const actual = extractModulesPackagesDuplicate(null, {
      metrics: {
        packages: {
          'package-a': {
            name: 'package-a',
            value: 50,
          },
          'package-b': {
            name: 'package-b',
            value: 10,
          },
          'package-b:package-a': {
            name: 'package-a',
            value: 10,
          },
          'package-c': {
            name: 'package-c',
            value: 30,
          },
          'org/package-d:package-c': {
            name: 'package-c',
            value: 40,
          },
          'package-c~1': {
            name: 'package-c',
            value: 40,
          },
        },
      },
    });

    expect(actual).toEqual({
      insights: {
        duplicatePackages: {
          type: 'WARNING',
          data: {
            'package-c': ['org/package-d:package-c', 'package-c~1', 'package-c'],
            'package-a': ['package-a', 'package-b:package-a'],
          },
        },
      },
      metrics: {
        duplicatePackagesCount: {
          value: 3,
        },
      },
    });
  });
});
