export const JOB_LABEL_PREFIX = {
  CURRENT: 'Current',
  BASELINE: 'Baseline',
};

export function generateDefaultJobLabel(buildNumber: number) {
  return `#${buildNumber}`;
}

export function generateJobLabel(buildNumber: number, length: number, index: number) {
  const defaultLabel = generateDefaultJobLabel(buildNumber);

  if (index === 0) {
    return `${JOB_LABEL_PREFIX.CURRENT} ${defaultLabel}`;
  }

  if (index === length - 1) {
    return `${JOB_LABEL_PREFIX.BASELINE} ${defaultLabel}`;
  }

  return defaultLabel;
}
