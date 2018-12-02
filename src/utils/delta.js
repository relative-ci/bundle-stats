import { round } from 'lodash';

export const getDelta = (baseline, current) => {
  const baselineValue = (baseline && baseline.value) || 0;
  const currentValue = (current && current.value) || 0;

  if (baselineValue === currentValue) {
    return 0;
  }

  if (baselineValue === 0) {
    return 100;
  }

  // eslint-disable-next-line no-mixed-operators
  return round(currentValue / baselineValue * 100 - 100, 8);
};

export const formatDelta = (value) => {
  // eslint-disable-next-line no-nested-ternary
  const sign = value > 0
    ? '+'
    : (value < 0 ? '-' : '');

  const absValue = Math.abs(value);

  const displayValue = (absValue > 0 && absValue < 0.1)
    ? '~0.01'
    : round(absValue, 2);

  return `${sign}${displayValue}%`;
};
