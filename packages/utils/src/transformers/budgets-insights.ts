import get from 'lodash/get';
import template from 'lodash/template';

import * as types from '../types';
import { InsightType } from '../constants';
import { getGlobalMetricType } from '../utils';

interface OptionBudgetMetric {
  metric: string;
  value: number;
}

interface Options {
  budgets?: Array<OptionBudgetMetric>;
}

interface BudgetInsightMetricData {
  currentValue: number;
  budgetValue: number;
  failed: boolean;
}

interface BudgetInsightMetric {
  /** Metric budget insight type */
  type: InsightType;
  message: {
    text: string;
    md: string;
  };
  /** Metric budget check data */
  data: BudgetInsightMetricData;
}

interface BudgetInsight extends types.Insight {
  data: {
    [metricId: string]: BudgetInsightMetric;
  };
}

interface BudgetsInsightsOutput {
  insights: {
    budgets: BudgetInsight;
  };
}

const resolveType = (insights: Array<[string, BudgetInsightMetric]>): InsightType => {
  if (insights.find(([_, { type }]) => type === InsightType.ERROR)) {
    return InsightType.ERROR;
  }

  if (insights.find(([_, { type }]) => type === InsightType.WARNING)) {
    return InsightType.WARNING;
  }

  return InsightType.SUCCESS;
};

// 3/3 budget checks passed
// 2/3 budget checks failed
// 1 failed, 1 warning, 2 success

const budgetInsightTemplate = template(
  '<%= count %>/<%= total %> budget checks <%= status %>'
);

const resolveStatus = (failedCount: number, warningCount: number): string => {
  if (failedCount) {
    return 'failed';
  }

  if (warningCount) {
    return 'warned';
  }

  return 'passed';
};

const getMessage = (insights: Array<[string, BudgetInsightMetric]>) => {
  const total = insights.length;
  const failedCount = insights.filter(([___, insight]) => insight.type === InsightType.ERROR).length;
  const warningCount = insights.filter(([___, insight]) => insight.type === InsightType.WARNING).length;
  const count = failedCount || warningCount || total;
  const status = resolveStatus(failedCount, warningCount);

  return {
    text: budgetInsightTemplate({
      count,
      total,
      status,
    }),
    md: budgetInsightTemplate({
      count: `**${count}**`,
      total: `**${total}**`,
      status,
    }),
  };
};

const budgetInsightMetricTemplate = template(
  // Add escapes for (|) to avoid lodash.template syntax errors
  // eslint-disable-next-line no-useless-escape
  '<%= metricLabel %> is <%= diffLabel %> budget \(<%= currentValue %> / <%= budgetValue %>\)',
);

const resolveDiffLabel = (metricBudgetInsight: BudgetInsightMetricData): string => {
  const { currentValue, budgetValue } = metricBudgetInsight;

  if (currentValue > budgetValue) {
    return 'above';
  }

  if (currentValue < budgetValue) {
    return 'below';
  }

  return 'equal with';
};

const resolveBudgetInsightMetricType = (metricBudgetInsight: BudgetInsightMetricData): InsightType => {
  if (metricBudgetInsight.failed) {
    return InsightType.ERROR;
  }

  if (metricBudgetInsight.currentValue === metricBudgetInsight.budgetValue) {
    return InsightType.WARNING;
  }

  return InsightType.SUCCESS;
};

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

    const insights: Array<[string, BudgetInsightMetric]> = [];

    budgetsOptions.forEach((budgetOption) => {
      const { metric: sourceMetricId, value: budgetValue } = budgetOption;
      const currentValue = get(currentExtractedData, `metrics.${sourceMetricId}.value`);
      const metricData = getGlobalMetricType(`${source}.${sourceMetricId}`);

      if (!currentValue) {
        return;
      }

      const isValueOverBudget = currentValue > budgetValue;
      const failed = metricData.biggerIsBetter ? !isValueOverBudget : isValueOverBudget;

      const budgetInsightMetricData = {
        currentValue,
        budgetValue,
        failed,
      };

      // Message template data
      const diffLabel = resolveDiffLabel(budgetInsightMetricData);
      const type = resolveBudgetInsightMetricType(budgetInsightMetricData);
      const currentFormattedValue = metricData.formatter(currentValue);
      const budgetFormattedValue = metricData.formatter(budgetValue);

      const messageText = budgetInsightMetricTemplate({
        metricLabel: metricData.label,
        currentValue: currentFormattedValue,
        diffLabel,
        budgetValue: budgetFormattedValue,
      });
      const messageMd = budgetInsightMetricTemplate({
        metricLabel: `**${metricData.label}**`,
        currentValue: `**${currentFormattedValue}**`,
        diffLabel,
        budgetValue: `**${budgetFormattedValue}**`,
      });

      insights.push([
        sourceMetricId,
        {
          type,
          message: {
            text: messageText,
            md: messageMd,
          },
          data: budgetInsightMetricData,
        },
      ]);
    });

    if (insights.length === 0) {
      return null;
    }

    const type = resolveType(insights);
    const message = getMessage(insights);

    return {
      insights: {
        budgets: {
          type,
          message,
          data: Object.fromEntries(insights),
        },
      },
    };
  };
