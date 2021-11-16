import { getMetricType } from '../utils';

interface Options {
  budgets?: Record<string, number>;
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

  Object.entries(budgetsOptions).forEach(([budgetMetricId, budgetValue]) => {
    const currentValue = currentExtractedData?.metrics?.[budgetMetricId]?.value;

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
