import { countModulesTransform } from '../count-modules-transform';

describe('countModulesTransform', () => {
  test('should return empty', () => {
    const actual = countModulesTransform();
    expect(actual).toEqual({ stats: { modulesCount: { value: 0 } } });
  });

  test('should return data', () => {
    const actual = countModulesTransform({
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

    expect(actual).toEqual({ stats: { modulesCount: { value: 3 } } });
  });
});
