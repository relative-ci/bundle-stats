import get from 'lodash/get';

import { BudgetConfig, BudgetResult } from './constants';

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
