import { countDuplicatePackagesBundleTransform } from '../count-duplicate-packages-bundle-transform';

describe('countDuplicatePackagesBundleTransform', () => {
  test('should return empty', () => {
    const actual = countDuplicatePackagesBundleTransform();
    expect(actual).toEqual({ stats: { duplicatePackagesCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = countDuplicatePackagesBundleTransform({
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
    });

    expect(actual).toEqual({ stats: { duplicatePackagesCount: { value: 2 } } });
  });
});
