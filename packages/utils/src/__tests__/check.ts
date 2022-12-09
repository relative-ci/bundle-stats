import * as checks from '../checks';

describe('Checks', () => {
  test('should return skipped check when data is missing', () => {
    expect(
      checks.evaluate(
        {
          fact: 'summary.webpack.fileSizeByTypeALL.deltaValue',
          operator: 'greaterThan',
          value: 0,
        },
        {},
        checks.CheckStatus.Failure,
      ),
    ).toEqual({
      condition: {
        fact: 'summary.webpack.fileSizeByTypeALL.deltaValue',
        operator: 'greaterThan',
        value: 0,
      },
    });
  });

  test('should return skipped check when the condition does not match', () => {
    expect(
      checks.evaluate(
        {
          fact: 'summary.webpack.fileSizeByTypeALL.deltaValue',
          operator: 'greaterThan',
          value: 0,
        },
        {
          summary: {
            webpack: {
              fileSizeByTypeALL: {
                deltaValue: 0,
              },
            },
          },
        },
        checks.CheckStatus.Failure,
      ),
    ).toEqual({
      condition: {
        fact: 'summary.webpack.fileSizeByTypeALL.deltaValue',
        operator: 'greaterThan',
        value: 0,
      },
    });
  });

  test('should return matched check', () => {
    expect(
      checks.evaluate(
        {
          fact: 'summary.webpack.fileSizeByTypeALL.deltaValue',
          operator: 'greaterThan',
          value: 0,
        },
        {
          summary: {
            webpack: {
              fileSizeByTypeALL: {
                deltaValue: 1,
              },
            },
          },
        },
        checks.CheckStatus.Failure,
      ),
    ).toEqual({
      condition: {
        fact: 'summary.webpack.fileSizeByTypeALL.deltaValue',
        operator: 'greaterThan',
        value: 0,
      },
      metricData: {
        deltaValue: 1,
      },
      status: checks.CheckStatus.Failure,
    });
  });
});
