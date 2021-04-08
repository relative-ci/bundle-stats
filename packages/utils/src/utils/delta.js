import round from 'lodash/round';

import {
  DELTA_TYPE_NO_CHANGE,
  DELTA_TYPE_NEGATIVE,
  DELTA_TYPE_POSITIVE,
  DELTA_TYPE_LEVEL_HIGH,
  DELTA_TYPE_LEVEL_LOW,
} from '../config/delta';

export const getDelta = (baseline, current) => {
  const baselineValue = (baseline && baseline.value) || 0;
  const currentValue = (current && current.value) || 0;

  if (baselineValue === currentValue) {
    return {
      delta: 0,
      deltaPercentage: 0,
    };
  }

  if (baselineValue === 0) {
    return {
      delta: currentValue,
      deltaPercentage: 100,
    };
  }

  return {
    delta: currentValue - baselineValue,
    deltaPercentage: round((currentValue / baselineValue) * 100 - 100, 8),
  };
};

/**
 * Format delta output
 *
 * @param {number} value Metric value
 * @param {Function} formatter Metric type formatter
 * @return {String} Delta output
 */
export const formatDelta = (value, formatter) => {
  // eslint-disable-next-line no-nested-ternary
  let sign = value > 0
    ? '+'
    : (value < 0 ? '-' : '');

  let absValue = Math.abs(value);

  if (absValue > 0 && absValue < 0.01) {
    sign = `~${sign}`;
    absValue = 0.01;
  }

  if (absValue > 0.01) {
    absValue = round(absValue, 2);
  }

  return `${sign}${formatter(absValue)}`;
};

/**
 *
 * Get delta type
 *
 * @param {number} deltaValue Delta value
 * @param {Boolean} biggerIsBetter Metric flag
 * @return {string} Delta type
 */
export const getDeltaType = (deltaValue, biggerIsBetter) => {
  if (deltaValue === 0) {
    return DELTA_TYPE_NO_CHANGE;
  }

  const absDiff = Math.abs(deltaValue);
  let level = '';

  if (absDiff <= 5) {
    level = DELTA_TYPE_LEVEL_LOW;
  }

  if (absDiff > 50) {
    level = DELTA_TYPE_LEVEL_HIGH;
  }

  let type = '';
  if ((deltaValue > 0 && biggerIsBetter) || (deltaValue < 0 && !biggerIsBetter)) {
    type = DELTA_TYPE_POSITIVE;
  } else {
    type = DELTA_TYPE_NEGATIVE;
  }

  return `${level ? `${level}_` : ''}${type}`;
};
