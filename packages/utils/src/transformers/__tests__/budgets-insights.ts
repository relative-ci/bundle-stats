import { getExtract } from '../budgets-insights';

describe('transformers/budgetsInsights', () => {
  describe('extract', () => {
    test('should return empty insights when no budgets options', () => {
      const extractBudgetsInsights = getExtract('webpack');

      const actual = extractBudgetsInsights(
        undefined,
        {
          metrics: { totalSizeByTypeALL: { value: 10000 } },
        },
        undefined,
        {},
      );

      expect(actual).toEqual(null);
    });

    test('should return budgets insights', () => {
      const extractBudgetsInsights = getExtract('webpack');
      const actual = extractBudgetsInsights(
        undefined,
        {
          metrics: { totalSizeByTypeALL: { value: 11776 } },
        },
        undefined,
        {
          budgets: [
            {
              metric: 'totalSizeByTypeALL',
              value: 10240,
            },
          ],
        },
      );

      expect(actual).toEqual({
        insights: {
          budgets: {
            type: 'ERROR',
            message: {
              text: '1/1 budget checks failed',
              md: '**1**/**1** budget checks failed',
            },
            data: {
              totalSizeByTypeALL: {
                type: 'ERROR',
                message: {
                  text: 'Bundle Size is above budget (11.5KB / 10KB)',
                  md: '**Bundle Size** is above budget (**11.5KB** / **10KB**)',
                },
                data: {
                  currentValue: 11776,
                  budgetValue: 10240,
                  failed: true,
                },
              },
            },
          },
        },
      });
    });

    test('should return budgets insights for sizes', () => {
      const extractBudgetsInsights = getExtract('webpack');

      const actual = extractBudgetsInsights(
        undefined,
        {
          metrics: { sizes: { totalSizeByTypeJS: { value: 11776 } } },
        },
        undefined,
        {
          budgets: [
            {
              metric: 'sizes.totalSizeByTypeJS',
              value: 10240,
            },
          ],
        },
      );

      expect(actual).toEqual({
        insights: {
          budgets: {
            type: 'ERROR',
            message: {
              text: '1/1 budget checks failed',
              md: '**1**/**1** budget checks failed',
            },
            data: {
              'sizes.totalSizeByTypeJS': {
                type: 'ERROR',
                message: {
                  text: 'JS is above budget (11.5KB / 10KB)',
                  md: '**JS** is above budget (**11.5KB** / **10KB**)',
                },
                data: {
                  currentValue: 11776,
                  budgetValue: 10240,
                  failed: true,
                },
              },
            },
          },
        },
      });
    });
  });
});
