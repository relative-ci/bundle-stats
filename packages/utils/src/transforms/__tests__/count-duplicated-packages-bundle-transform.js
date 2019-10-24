import { countDuplicatedPackagesBundleTransform } from '../count-duplicated-packages-bundle-transform';

describe('countDuplicatedPackagesBundleTransform', () => {
  test('should return empty', () => {
    const actual = countDuplicatedPackagesBundleTransform();
    expect(actual).toEqual({ stats: { duplicatedPackageCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = countDuplicatedPackagesBundleTransform({
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

    expect(actual).toEqual({ stats: { duplicatedPackageCount: { value: 2 } } });
  });
});
