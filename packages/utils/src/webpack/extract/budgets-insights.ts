import get from 'lodash/get';

interface OptionBudgetMetric {
  metric: string;
  value: number;
}

interface Options {
  budgets?: Array<OptionBudgetMetric>;
}

interface BudgetInsight {
  value: number;
  budget: number;
  overBudget: boolean;
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

    if (!currentValue) {
      return;
    }

    const budgetInsight = {
      value: currentValue,
      budget: budgetValue,
      overBudget: currentValue > budgetValue,
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
