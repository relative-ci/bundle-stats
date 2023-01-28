import { BudgetStatus } from '../constants';

import * as budgets from '../budgets';

describe('Budgets', () => {
  test('should return skipped budget when data is missing', () => {
    expect(
      budgets.evaluate(
        {
          condition: {
            fact: 'webpack.totalSizeByTypeALL.delta',
            operator: 'greaterThan',
            value: 0,
          },
          status: BudgetStatus.FAILURE,
        },
        {},
      ),
    ).toEqual({
      config: {
        condition: {
          fact: 'webpack.totalSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        status: BudgetStatus.FAILURE,
      },
    });
  });

  test('should return skipped budget when the condition does not match', () => {
    expect(
      budgets.evaluate(
        {
          condition: {
            fact: 'webpack.totalSizeByTypeALL.delta',
            operator: 'greaterThan',
            value: 0,
          },
          status: BudgetStatus.FAILURE,
        },
        {
          webpack: {
            totalSizeByTypeALL: {
              delta: 0,
            },
          },
        },
      ),
    ).toEqual({
      config: {
        condition: {
          fact: 'webpack.totalSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        status: BudgetStatus.FAILURE,
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
            fact: 'webpack.totalSizeByTypeALL.delta',
            operator: 'greaterThan',
            value: 0,
          },
          status: BudgetStatus.FAILURE,
        },
        {
          webpack: {
            totalSizeByTypeALL: {
              delta: 1,
            },
          },
        },
      ),
    ).toEqual({
      config: {
        condition: {
          fact: 'webpack.totalSizeByTypeALL.delta',
          operator: 'greaterThan',
          value: 0,
        },
        status: BudgetStatus.FAILURE,
      },
      value: 1,
      data: {
        delta: 1,
      },
      matched: true,
    });
  });
});
