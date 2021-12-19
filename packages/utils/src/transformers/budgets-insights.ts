import get from 'lodash/get';
import template from 'lodash/template';

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
  data: {
    text: string;
    md: string;
  };
  source: BudgetInsight;
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

const infoTemplate = template('<%= metric %> is <%= diff %> <%= value %> budget');

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

export const getInfo = (globalMetricId: string, budgetInsight: BudgetInsight): BudgetInsightInfo => {
  const metric = getGlobalMetricType(globalMetricId);

  const diff = resolveDiffLabel(budgetInsight);
  const type = resolveType(budgetInsight);
  const value = metric.formatter(budgetInsight.budgetValue);

  return {
    type,
    data: {
      text: infoTemplate({ metric: metric.label, diff, value }),
      md: infoTemplate({
        metric: `**${metric.label}**`,
        diff,
        value: `**${value}**`,
      }),
    },
    source: budgetInsight,
  };
};
