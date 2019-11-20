import { extractMeta } from '../meta';

describe('Webpack/extract/meta', () => {
  test('should return empty data if missing', () => {
    const actual = extractMeta({});

    const expected = {
      meta: {
        webpack: {
          builtAt: '',
          hash: '',
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  test('should return data if available', () => {
    const actual = extractMeta({
      builtAt: 1546300800000,
      hash: 'abcd1234',
    });

    const expected = {
      meta: {
        webpack: {
          builtAt: '2019-01-01T00:00:00.000Z',
          hash: 'abcd1234',
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});
