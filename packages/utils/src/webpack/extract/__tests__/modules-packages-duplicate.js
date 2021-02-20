import { extractModulesPackagesDuplicate } from '../modules-packages-duplicate';

describe('Webpack/extract/extractModulesPackagesDuplicate', () => {
  test('should return empty', () => {
    const actual = extractModulesPackagesDuplicate();
    expect(actual).toEqual({
      metrics: { duplicatePackagesCount: { value: 0 } },
    });
  });

  test('should return data', () => {
    const actual = extractModulesPackagesDuplicate(null, {
      metrics: {
        packages: {
          'package-a': {
            value: 50,
          },
          'package-b': {
            value: 10,
          },
          'package-b:package-a': {
            value: 10,
          },
          'package-c': {
            value: 10,
          },
          'org/package-d:package-c': {
            value: 10,
          },
        },
      },
    });

    expect(actual).toEqual({
      insights: {
        duplicatePackages: {
          type: 'WARNING',
          // @TODO Obsolete structure, remove in v3.0
          data: {
            'package-a': ['package-a', 'package-b:package-a'],
            'package-c': ['package-c', 'org/package-d:package-c'],
          },
          // @NOTE New extended structure for the insight
          dataExt: {
            'package-a': {
              value: 60,
              children: [
                {
                  name: 'package-a',
                  value: 50,
                },
                {
                  name: 'package-b:package-a',
                  value: 10,
                },
              ],
            },
            'package-c': {
              value: 20,
              children: [
                {
                  name: 'package-c',
                  value: 10,
                },
                {
                  name: 'org/package-d:package-c',
                  value: 10,
                },
              ]
            },
          },
        },
      },
      metrics: {
        duplicatePackagesCount: {
          value: 2,
        },
      },
    });
  });
});
