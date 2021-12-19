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
            totalSizeByTypeALL: {
              currentValue: 11776,
              budgetValue: 10240,
              failed: true,
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
            'sizes.totalSizeByTypeJS': {
              currentValue: 11776,
              budgetValue: 10240,
              failed: true,
            },
          },
        },
      });
    });
  });
});
