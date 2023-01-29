import {
  extractModulesPackagesDuplicate,
  getDuplicatePackagesInsight,
} from '../modules-packages-duplicate';

describe('Webpack/extract/extractModulesPackagesDuplicate', () => {
  describe.only('getDuplicatePackagesInsight', () => {
    test('should return insight when there are no duplicate packages', () => {
      expect(getDuplicatePackagesInsight({})).toEqual({
        type: 'INFO',
        data: {
          packages: {},
          text: 'Bundle does not contain duplicate packages',
        },
      });
      expect(getDuplicatePackagesInsight({}, {})).toEqual({
        type: 'INFO',
        data: {
          packages: {},
          text: 'Bundle does not contain duplicate packages',
        },
      });
    });

    test('should return insight when there are duplicate packages', () => {
      expect(
        getDuplicatePackagesInsight({
          'package-a': ['package-a', 'package-a~1'],
          'package-b': ['package-b', 'package-b~1'],
        }),
      ).toEqual({
        type: 'WARNING',
        data: {
          packages: {
            'package-a': ['package-a', 'package-a~1'],
            'package-b': ['package-b', 'package-b~1'],
          },
          text: 'Bundle contains 2 duplicate packages',
        },
      });
    });

    test('should return insight when there are duplicate packages but no baseline change', () => {
      expect(
        getDuplicatePackagesInsight(
          {
            'package-a': ['package-a', 'package-a~1'],
            'package-b': ['package-b', 'package-b~1'],
          },
          {
            'package-a': ['package-a', 'package-a~1'],
            'package-b': ['package-b', 'package-b~1'],
          },
        ),
      ).toEqual({
        type: 'WARNING',
        data: {
          packages: {
            'package-a': ['package-a', 'package-a~1'],
            'package-b': ['package-b', 'package-b~1'],
          },
          text: 'Bundle contains 2 duplicate packages',
        },
      });
    });

    test('should return insight when there are new duplicate packages and baseline changes', () => {
      expect(
        getDuplicatePackagesInsight(
          {
            'package-a': ['package-a', 'package-a~1', 'package-a~2'],
            'package-b': ['package-b', 'package-b~1'],
          },
          {
            'package-a': ['package-a', 'package-a~1'],
            'package-b': ['package-b', 'package-b~1'],
          },
        ),
      ).toEqual({
        type: 'ERROR',
        data: {
          packages: {
            'package-a': ['package-a', 'package-a~1', 'package-a~2'],
            'package-b': ['package-b', 'package-b~1'],
          },
          text: 'Bundle introduced 1 duplicate package',
        },
      });
    });

    test('should return insight when there are new and removed duplicate packages', () => {
      expect(
        getDuplicatePackagesInsight(
          {
            'package-a': ['package-a', 'package-a~1'],
          },
          {
            'package-b': ['package-b', 'package-b~1'],
          },
        ),
      ).toEqual({
        type: 'ERROR',
        data: {
          packages: { 'package-a': ['package-a', 'package-a~1'] },
          text: 'Bundle introduced 1 and removed 1 duplicate package',
        },
      });
    });
  });

  test('should return empty', () => {
    const actual = extractModulesPackagesDuplicate(null, null);
    expect(actual).toEqual({
      insights: {
        duplicatePackagesV3: {
          type: 'INFO',
          data: {
            text: 'Bundle does not contain duplicate packages',
            packages: {},
          },
        },
      },
      metrics: { duplicatePackagesCount: { value: 0 } },
    });
  });

  test('should return metric and insight', () => {
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
        duplicatePackagesV3: {
          type: 'ERROR',
          data: {
            text: 'Bundle introduced 5 duplicate packages',
            packages: {
              'package-c': ['org/package-d:package-c', 'package-c~1', 'package-c'],
              'package-a': ['package-a', 'package-b:package-a'],
            },
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

  test('should return metric and insight when baseline insights v2 data is present', () => {
    const actual = extractModulesPackagesDuplicate(
      null,
      {
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
      },
      {
        insights: {
          webpack: {
            duplicatePackages: {
              type: 'WARNING',
              data: {
                'package-c': ['org/package-d:package-c', 'package-c'],
                'package-a': ['package-a', 'package-b:package-a'],
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual({
      insights: {
        duplicatePackages: {
          type: 'WARNING',
          data: {
            'package-c': ['org/package-d:package-c', 'package-c~1', 'package-c'],
            'package-a': ['package-a', 'package-b:package-a'],
          },
        },
        duplicatePackagesV3: {
          type: 'ERROR',
          data: {
            text: 'Bundle introduced 1 duplicate package',
            packages: {
              'package-c': ['org/package-d:package-c', 'package-c~1', 'package-c'],
              'package-a': ['package-a', 'package-b:package-a'],
            },
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
