import round from 'lodash/round';

const FILE_SIZE_MULTIPLIERS = {
  KiB: 1024,
  MiB: 1024 * 1024,
};

const DURATION_MULTIPLIERS = {
  s: 1000,
  min: 60 * 1000,
};

export const formatFileSize = (val) => {
  if (typeof val !== 'number') {
    return `0B`;
  }

  if (val < FILE_SIZE_MULTIPLIERS.KiB) {
    return `${val}B`;
  }

  if (val < FILE_SIZE_MULTIPLIERS.MiB) {
    return `${round(val / FILE_SIZE_MULTIPLIERS.KiB, 2)}KiB`;
  }

  return `${round(val / FILE_SIZE_MULTIPLIERS.MiB, 2)}MiB`;
};

export const formatDuration = (val) => {
  if (typeof val !== 'number') {
    return `${0}ms`;
  }

  if (val < DURATION_MULTIPLIERS.s) {
    return `${val}ms`;
  }

  if (val < DURATION_MULTIPLIERS.min) {
    return `${round(val / DURATION_MULTIPLIERS.s, 1)}s`;
  }

  return `${round(val / DURATION_MULTIPLIERS.min, 1)}min`;
};

export const formatNumber = (val) => `${val}`;

export const formatCommit = (commitSha) => (commitSha && commitSha.substr(0, 7)) || '';

export const formatPercentage = (val) => `${val}%`;
