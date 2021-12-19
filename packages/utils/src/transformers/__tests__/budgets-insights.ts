import { INFO_MESSAGE_TEMPLATE, getInfo, getExtract } from '../budgets-insights';

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

  describe('getInfo', () => {
    test('should get failed budget insight', () => {
      expect(
        getInfo('webpack.totalSizeByTypeALL', {
          currentValue: 512 * 1024,
          budgetValue: 256 * 1024,
          failed: true,
        }),
      ).toEqual({
        type: 'ERROR',
        message: {
          template: INFO_MESSAGE_TEMPLATE,
          data: {
            metricLabel: 'Bundle Size',
            diffLabel: 'over',
            currentValue: '512KB',
            budgetValue: '256KB',
          },
        },
        source: {
          metricId: 'webpack.totalSizeByTypeALL',
          budgetInsight: {
            currentValue: 512 * 1024,
            budgetValue: 256 * 1024,
            failed: true,
          },
        },
      });
    });

    test('should get success budget insight', () => {
      expect(
        getInfo('webpack.totalSizeByTypeALL', {
          currentValue: 512 * 1024,
          budgetValue: 1024 * 1024,
          failed: false,
        }),
      ).toEqual({
        type: 'SUCCESS',
        message: {
          template: INFO_MESSAGE_TEMPLATE,
          data: {
            metricLabel: 'Bundle Size',
            diffLabel: 'under',
            currentValue: '512KB',
            budgetValue: '1MB',
          },
        },
        source: {
          metricId: 'webpack.totalSizeByTypeALL',
          budgetInsight: {
            currentValue: 512 * 1024,
            budgetValue: 1024 * 1024,
            failed: false,
          },
        },
      });
    });

    test('should get equal budget insight', () => {
      expect(
        getInfo('webpack.totalSizeByTypeALL', {
          currentValue: 512 * 1024,
          budgetValue: 512 * 1024,
          failed: false,
        }),
      ).toEqual({
        type: 'WARNING',
        message: {
          template: INFO_MESSAGE_TEMPLATE,
          data: {
            metricLabel: 'Bundle Size',
            diffLabel: 'equal with',
            currentValue: '512KB',
            budgetValue: '512KB',
          },
        },
        source: {
          metricId: 'webpack.totalSizeByTypeALL',
          budgetInsight: {
            currentValue: 512 * 1024,
            budgetValue: 512 * 1024,
            failed: false,
          },
        },
      });
    });
  });
});
