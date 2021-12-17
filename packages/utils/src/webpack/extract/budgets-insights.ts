import get from 'lodash/get';

import { getMetricType } from '../utils';

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

interface BudgetsInsights {
  [metricId: string]: BudgetInsight;
}

interface ExtractBudgetsInsights {
  insights: {
    budgets: BudgetsInsights;
  };
}

export default function extractBudgetsInsights(
  _: unknown,
  currentExtractedData: any,
  __: unknown,
  options: Options = {}
): ExtractBudgetsInsights | null {
  const { budgets: budgetsOptions } = options;

  if (!budgetsOptions) {
    return null;
  }

  const insights: Array<[string, BudgetInsight]> = [];

  budgetsOptions.forEach((budgetOption) => {
    const { metric: budgetMetricId, value: budgetValue } = budgetOption;
    const currentValue = get(currentExtractedData, `metrics.${budgetMetricId}.value`);
    const metric = getMetricType(budgetMetricId);

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
}
