import { countPackagesBundleTransform } from '../count-packages-bundle-transform';

describe('countPackagesBundleTransform', () => {
  test('should return empty', () => {
    const actual = countPackagesBundleTransform();
    expect(actual).toEqual({ stats: { packageCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = countPackagesBundleTransform({
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
    });

    expect(actual).toEqual({ stats: { packageCount: { value: 3 } } });
  });
});
