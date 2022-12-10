import get from 'lodash/get';

import { Condition, MetricRunInfo } from './constants';

export enum CheckStatus {
  FAILURE = 'FAILURE',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
}

export interface CheckSkipped {
  /**
   * The condition config
   */
  condition: Condition;
}

export interface CheckEvaluated extends CheckSkipped {
  /**
   * Checked metric value
   */
  value: number;
  /**
   * Metric run info data
   */
  data: MetricRunInfo;
  /**
   * Check condition matched flag
   */
  matched: boolean;
  /**
   * Check status when the condition matched
   */
  status?: CheckStatus;
}

export type CheckResult = CheckSkipped | CheckEvaluated;

export const evaluate = (condition: Condition, payload: any, status: CheckStatus): CheckResult => {
  const value = get(payload, condition.fact);

  if (typeof value === 'undefined') {
    return {
      condition,
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

  // Get the parent (metric) key path
  const metricKeyPath = condition.fact.split('.').slice(0, -1).join('.');
  const data = get(payload, metricKeyPath);

  // Check condition did not match
  if (!result) {
    return {
      condition,
      value,
      data,
      matched: false,
    };
  }

  // Check condition matched
  return {
    condition,
    value,
    data,
    matched: true,
    status,
  };
};
