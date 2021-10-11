import configureMeasurements, { digital, time } from 'convert-units';
import round from 'lodash/round';

const convert = configureMeasurements({ digital, time });

export const formatFileSize = (val) => {
  const res = convert(val).from('B').toBest();
  return `${round(res.val, 2)}${res.unit}`;
};

export const formatDuration = (val) => {
  const res = convert(val).from('ms').toBest();
  return `${round(res.val, 4)}${res.unit}`;
};

export const formatNumber = (val) => `${val}`;

export const formatCommit = (commitSha) => (commitSha && commitSha.substr(0, 7)) || '';

export const formatPercentage = (val) => `${val}%`;
