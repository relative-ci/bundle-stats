import get from 'lodash/get';

import { Condition, MetricRunInfo } from './constants';

export enum BudgetStatus {
  FAILURE = 'FAILURE',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

export interface BudgetConfig {
  /**
   * The condition config
   */
  condition: Condition;
  /**
   * User status when the condition is matched
   */
  status: BudgetStatus;
  /**
   * User message to display when the condition is matched
   */
  message?: string;
}

export interface BudgetSkipped {
  config: BudgetConfig;
}

export interface BudgetEvaluated {
  config: BudgetConfig;

  /**
   * The metric value that is checked
   */
  value: number;
  /**
   * Metric run info data
   */
  data: MetricRunInfo;
  /**
   * Budget matched flag
   */
  matched: boolean;
}

export type BudgetResult = BudgetSkipped | BudgetEvaluated;

export const evaluate = (config: BudgetConfig, payload: any): BudgetResult => {
  const { condition } = config;

  const value = get(payload, condition.fact);

  if (typeof value === 'undefined') {
    return {
      config,
    };
  }

  let result;

  switch (condition.operator) {
    case 'smallerThan':
      result = value < condition.value;
      break;
    case 'smallerThanInclusive':
      result = value <= condition.value;
      break;
    case 'equal':
      result = value === condition.value;
      break;
    case 'notEqual':
      result = value !== condition.value;
      break;
    case 'greaterThan':
      result = value > condition.value;
      break;
    case 'greaterThanInclusive':
      result = value >= condition.value;
      break;
    default: {
      result = false;
    }
  }

  // Get the metric run info
  const metricKeyPath = condition.fact.split('.').slice(0, -1).join('.');
  const data = get(payload, metricKeyPath);

  if (!result) {
    return {
      config,
      value,
      data,
      matched: false,
    };
  }

  return {
    config,
    value,
    data,
    matched: true,
  };
};
