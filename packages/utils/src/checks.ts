import get from 'lodash/get';

import { MetricRunInfo } from './constants';

export type CheckConditionOperator = 'smallerThan' | 'smallerThanInclusive' | 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanInclusive';

export interface CheckCondition {
  fact: string;
  operator: CheckConditionOperator;
  value: number;
  inactive?: boolean;
}

export enum CheckStatus {
  Failure = 'FAILURE',
  Warning = 'WARNING',
  Success = 'SUCCESS',
}

export interface CheckSkipped {
  condition: CheckCondition;
}

export interface CheckEvaluated extends CheckSkipped {
  metricData: MetricRunInfo;
  status: CheckStatus;
}

export type CheckResult = CheckSkipped | CheckEvaluated;

export const evaluate = (
  condition: CheckCondition,
  payload: any,
  status: CheckStatus,
): CheckResult => {
  const metricValue = get(payload, condition.fact);

  if (typeof metricValue === 'undefined') {
    return {
      condition,
    };
  }

  let result;

  switch (condition.operator) {
    case 'smallerThan':
      result = metricValue < condition.value;
      break;
    case 'smallerThanInclusive':
      result = metricValue <= condition.value;
      break;
    case 'equal':
      result = metricValue === condition.value;
      break;
    case 'notEqual':
      result = metricValue !== condition.value;
      break;
    case 'greaterThan':
      result = metricValue > condition.value;
      break;
    case 'greaterThanInclusive':
      result = metricValue >= condition.value;
      break;
    default: {
      result = false;
    }
  }

  if (!result) {
    return {
      condition,
    };
  }

  // Get the parent (metric) key path
  const metricKeyPath = condition.fact.split('.').slice(0, -1).join('.');
  const metricData = get(payload, metricKeyPath);

  return {
    condition,
    metricData,
    status,
  };
};
