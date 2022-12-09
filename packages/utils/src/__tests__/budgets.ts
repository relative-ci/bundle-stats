import * as budgets from '../budgets';

describe('Budgets', () => {
  test('should return skipped budget when data is missing', () => {
    expect(
      budgets.evaluate(
        {
          condition: {
            fact: 'webpack.fileSizeByTypeALL.delta',
            operator: 'greaterThan',
            value: 0,
          },
          status: budgets.BudgetStatus.FAILURE,
        },
        {},
      ),
    ).toEqual({
      config: {
        condition: {
          fact: 'webpack.fileSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        status: budgets.BudgetStatus.FAILURE,
      },
    });
  });

  test('should return skipped budget when the condition does not match', () => {
    expect(
      budgets.evaluate(
        {
          condition: {
            fact: 'webpack.fileSizeByTypeALL.delta',
            operator: 'greaterThan',
            value: 0,
          },
          status: budgets.BudgetStatus.FAILURE,
        },
        {
          webpack: {
            fileSizeByTypeALL: {
              delta: 0,
            },
          },
        },
      ),
    ).toEqual({
      config: {
        condition: {
          fact: 'webpack.fileSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        status: budgets.BudgetStatus.FAILURE,
      },
      value: 0,
      data: {
        delta: 0,
      },
      matched: false,
    });
  });

  test('should return matched budget', () => {
    expect(
      budgets.evaluate(
        {
          condition: {
            fact: 'webpack.fileSizeByTypeALL.delta',
            operator: 'greaterThan',
            value: 0,
          },
          status: budgets.BudgetStatus.FAILURE,
        },
        {
          webpack: {
            fileSizeByTypeALL: {
              delta: 1,
            },
          },
        },
      ),
    ).toEqual({
      config: {
        condition: {
          fact: 'webpack.fileSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        status: budgets.BudgetStatus.FAILURE,
      },
      value: 1,
      data: {
        delta: 1,
      },
      matched: true,
    });
  });
});
