import get from 'lodash/get';

import { getGlobalMetricType } from '../utils';

interface OptionBudgetMetric {
  metric: string;
  value: number;
}

interface Options {
  budgets?: Array<OptionBudgetMetric>;
}

interface BudgetInsight {
  currentValue: number;
  budgetValue: number;
  failed: boolean;
}

interface BudgetInsights {
  [metricId: string]: BudgetInsight;
}

interface BudgetsInsightsOutput {
  insights: {
    budgets: BudgetInsights;
  };
}

export const getExtract =
  (source: string) => (
    _: unknown,
    currentExtractedData: any,
    __: unknown,
    options: Options = {},
  ): BudgetsInsightsOutput | null => {
    const { budgets: budgetsOptions } = options;

    if (!budgetsOptions) {
      return null;
    }

    const insights: Array<[string, BudgetInsight]> = [];

    budgetsOptions.forEach((budgetOption) => {
      const { metric: budgetMetricId, value: budgetValue } = budgetOption;
      const currentValue = get(currentExtractedData, `metrics.${budgetMetricId}.value`);
      const metric = getGlobalMetricType(`${source}.${budgetMetricId}`);

      if (!currentValue) {
        return;
      }

      const isValueOverBudget = currentValue > budgetValue;

      const budgetInsight = {
        currentValue,
        budgetValue,
        failed: metric.biggerIsBetter ? !isValueOverBudget : isValueOverBudget,
      };

      insights.push([budgetMetricId, budgetInsight]);
    });

    if (insights.length === 0) {
      return null;
    }

    return {
      insights: {
        budgets: Object.fromEntries(insights),
      },
    };
  };
