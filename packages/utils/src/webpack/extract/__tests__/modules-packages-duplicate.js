import { extractModulesPackagesDuplicate } from '../modules-packages-duplicate';

describe('Webpack/extract/extractModulesPackagesDuplicate', () => {
  test('should return empty', () => {
    const actual = extractModulesPackagesDuplicate();
    expect(actual).toEqual({
      warnings: {},
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
      warnings: {
        duplicatePackages: {
          'package-a': [
            'package-a',
            'package-b:package-a',
          ],
          'package-c': [
            'package-c',
            'org/package-d:package-c',
          ],
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
