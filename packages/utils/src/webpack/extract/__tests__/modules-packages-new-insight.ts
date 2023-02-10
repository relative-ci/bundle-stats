import { extractModulesPackagesNewInsight } from '../modules-packages-new-insight';

describe('Webpack/extracts/extractModulesPackagesNewInsight', () => {
  test('should return null when there is no baseline', () => {
    const actual = extractModulesPackagesNewInsight(null, {
      metrics: {
        packages: {
          'package-a': {
            name: 'package-a',
            size: 100,
          },
        },
      },
    });

    expect(actual).toEqual(null);
  });

  test('should return null when there are no new packages', () => {
    const actual = extractModulesPackagesNewInsight(
      null,
      {
        metrics: {
          packages: {
            'package-a': {
              name: 'package-a',
              size: 100,
            },
          },
        },
      },
      {
        metrics: {
          webpack: {
            packages: {
              'package-a': {
                name: 'package-a',
                size: 100,
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual(null);
  });

  test('should return insights when there is a new package', () => {
    const actual = extractModulesPackagesNewInsight(
      null,
      {
        metrics: {
          packages: {
            'package-a': {
              name: 'package-a',
              size: 100,
            },
            'package-b': {
              name: 'package-b',
              size: 100,
            },
          },
        },
      },
      {
        metrics: {
          webpack: {
            packages: {
              'package-a': {
                name: 'package-a',
                size: 100,
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual({
      insights: {
        newPackages: {
          type: 'warning',
          data: {
            text: 'Bundle introduced one new package: package-b',
            packages: ['package-b'],
          },
          changes: true,
        },
      },
    });
  });

  test('should return insights when there are new packages', () => {
    const actual = extractModulesPackagesNewInsight(
      null,
      {
        metrics: {
          packages: {
            'package-a': {
              name: 'package-a',
              size: 100,
            },
            'package-b': {
              name: 'package-b',
              size: 100,
            },
            // Duplicate package
            'package-b~1': {
              name: 'package-b',
              size: 100,
            },
            // New package
            'package-c': {
              name: 'package-c',
              size: 100,
            },

            // New and duplicate package
            'package-d': {
              name: 'package-d',
              size: 100,
            },
            'package-d~1': {
              name: 'package-d',
              size: 100,
            },
          },
        },
      },
      {
        metrics: {
          webpack: {
            packages: {
              'package-a': {
                name: 'package-a',
                size: 100,
              },
              'package-b': {
                name: 'package-b',
                size: 100,
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual({
      insights: {
        newPackages: {
          type: 'warning',
          data: {
            text: 'Bundle introduced 2 new packages: package-c, package-d',
            packages: ['package-c', 'package-d'],
          },
          changes: true,
        },
      },
    });
  });
});
