import get from 'lodash/get';

import { InsightType } from '../constants';
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

interface BudgetInsightInfo {
  type: InsightType;
  message: {
    template: string;
    data: Record<string, unknown>;
  };
  source: {
    metricId: string;
    budgetInsight: BudgetInsight;
  };
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

const resolveDiffLabel = (budgetInsight: BudgetInsight): string => {
  const { currentValue, budgetValue } = budgetInsight;

  if (currentValue > budgetValue) {
    return 'over';
  }

  if (currentValue < budgetValue) {
    return 'under';
  }

  return 'equal with';
};

const resolveType = (budgetInsight: BudgetInsight): InsightType => {
  if (budgetInsight.failed) {
    return InsightType.ERROR;
  }

  if (budgetInsight.currentValue === budgetInsight.budgetValue) {
    return InsightType.WARNING;
  }

  return InsightType.SUCCESS;
};

// Add escapes for (|) to avoid lodash.template syntax errors
// eslint-disable-next-line no-useless-escape
export const INFO_MESSAGE_TEMPLATE = '<%= metricLabel %> value \(<%= currentValue %>\) is <%= diffLabel %> <%= budgetValue %> budget';

export const getInfo = (globalMetricId: string, budgetInsight: BudgetInsight): BudgetInsightInfo => {
  const metric = getGlobalMetricType(globalMetricId);

  const diffLabel = resolveDiffLabel(budgetInsight);
  const type = resolveType(budgetInsight);
  const currentValue = metric.formatter(budgetInsight.currentValue);
  const budgetValue = metric.formatter(budgetInsight.budgetValue);

  return {
    type,
    message: {
      template: INFO_MESSAGE_TEMPLATE,
      data: {
        metricLabel: metric.label,
        diffLabel,
        currentValue,
        budgetValue,
      },
    },
    source: {
      metricId: globalMetricId,
      budgetInsight,
    },
  };
};
