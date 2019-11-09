import { metaWebpackTransform } from '../meta-webpack-transform';

describe('metaWebpackTransform', () => {
  test('should return empty data if missing', () => {
    const actual = metaWebpackTransform({});

    const expected = {
      meta: {
        webpack: {
          stats: {
            builtAt: '',
            hash: '',
          },
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  test('should return data if available', () => {
    const actual = metaWebpackTransform({
      builtAt: 1546300800000,
      hash: 'abcd1234',
    });

    const expected = {
      meta: {
        webpack: {
          stats: {
            builtAt: '2019-01-01T00:00:00.000Z',
            hash: 'abcd1234',
          },
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});
