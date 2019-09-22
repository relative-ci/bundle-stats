import { countModulesBundleTransform } from '../count-modules-bundle-transform';

describe('countModulesBundleTransform', () => {
  test('should return empty', () => {
    const actual = countModulesBundleTransform();
    expect(actual).toEqual({ stats: { moduleCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = countModulesBundleTransform({
      modules: {
        0: {
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
        1: {
          chunkNames: ['vendors'],
          modules: {
            'module-c': {
              name: 'module-c',
              value: 3000,
            },
          },
        },
      },
    });

    expect(actual).toEqual({ stats: { moduleCount: { value: 3 } } });
  });
});
