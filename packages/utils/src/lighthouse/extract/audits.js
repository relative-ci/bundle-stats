import get from 'lodash/get';

/**
 * Extract lighthouse audits values
 *
 * @param {import("../../../types").LighthouseSource} lighthouseSource
 *
 * @typedef {Object} CategoryAuditMetrics
 * @property {import("../../../types").LighthouseMetricsAudits} metrics
 *
 * @return CategoryAuditMetrics
 */

const METRIC_KEYS = {
  speedIndex: 'speed-index',
  firstMeaningfulPaint: 'first-meaningful-paint',
  timeToFirstByte: 'time-to-first-byte',
  firstInteractive: 'first-cpu-idle',
  totalByteWeight: 'total-byte-weight',
  domSize: 'dom-size',
};

export const extractAudits = (lighthouseSource) => {
  const metrics = Object.entries(METRIC_KEYS).reduce((agg, [metricKey, lighthouseAuditId]) => ({
    ...agg,
    [metricKey]: {
      value: get(lighthouseSource, ['audits', lighthouseAuditId, 'numericValue'], 0),
    },
  }), {});

  return { metrics };
};
