import * as checks from '../checks';

describe('Checks', () => {
  test('should return skipped check when data is missing', () => {
    expect(
      checks.evaluate(
        {
          fact: 'webpack.fileSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        {},
        checks.CheckStatus.FAILURE,
      ),
    ).toEqual({
      condition: {
        fact: 'webpack.fileSizeByTypeALL.delta',
        operator: 'greaterThan',
        value: 0,
      },
    });
  });

  test('should return skipped check when the condition does not match', () => {
    expect(
      checks.evaluate(
        {
          fact: 'webpack.fileSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        {
          webpack: {
            fileSizeByTypeALL: {
              delta: 0,
            },
          },
        },
        checks.CheckStatus.FAILURE,
      ),
    ).toEqual({
      condition: {
        fact: 'webpack.fileSizeByTypeALL.delta',
        operator: 'greaterThan',
        value: 0,
      },
      value: 0,
      data: {
        delta: 0,
      },
      matched: false,
    });
  });

  test('should return matched check', () => {
    expect(
      checks.evaluate(
        {
          fact: 'webpack.fileSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        {
          webpack: {
            fileSizeByTypeALL: {
              delta: 1,
            },
          },
        },
        checks.CheckStatus.FAILURE,
      ),
    ).toEqual({
      condition: {
        fact: 'webpack.fileSizeByTypeALL.delta',
        operator: 'greaterThan',
        value: 0,
      },
      value: 1,
      data: {
        delta: 1,
      },
      matched: true,
      status: checks.CheckStatus.FAILURE,
    });
  });
});
