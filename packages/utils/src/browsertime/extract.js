import get from 'lodash/get';

const METRICS = {
  firstPaint: 'statistics.timings.firstPaint',
  fullyLoaded: 'statistics.timings.fullyLoaded',
  backEndTime: 'statistics.timings.pageTimings.backEndTime',
  domContentLoadedTime: 'statistics.timings.pageTimings.domContentLoadedTime',
  domInteractiveTime: 'statistics.timings.pageTimings.domInteractiveTime',
  domainLookupTime: 'statistics.timings.pageTimings.domainLookupTime',
  frontEndTime: 'statistics.timings.pageTimings.frontEndTime',
  pageDownloadTime: 'statistics.timings.pageTimings.pageDownloadTime',
  pageLoadTime: 'statistics.timings.pageTimings.pageLoadTime',
  redirectionTime: 'statistics.timings.pageTimings.redirectionTime',
  serverConnectionTime: 'statistics.timings.pageTimings.serverConnectionTime',
  serverResponseTime: 'statistics.timings.pageTimings.serverResponseTime',
  firstContentfulPaint: 'statistics.timings.paintTiming.first-contentful-paint',
  rumSpeedIndex: 'statistics.timings.rumSpeedIndex',
  firstVisualChange: 'statistics.visualMetrics.FirstVisualChange',
  lastVisualChange: 'statistics.visualMetrics.LastVisualChange',
  perceptualSpeedIndex: 'statistics.visualMetrics.PerceptualSpeedIndex',
  speedIndex: 'statistics.visualMetrics.SpeedIndex',
  visualComplete85: 'statistics.visualMetrics.VisualComplete85',
  visualComplete95: 'statistics.visualMetrics.VisualComplete95',
  visualComplete99: 'statistics.visualMetrics.VisualComplete99',
};

/**
 *
 * Extract metrics from Browsertime stats
 *
 * @param {import("../../types").BrowsertimeSource} browsertimeSource
 *
 * @typedef {Object} BrowsertimeMetricsRes
 * @property {import("../../types").BrowsertimeMetrics} metrics
 *
 * @return @BrowsertimeMetricsRes
 */
export const extract = (browsertimeSource) => {
  const metrics = Object.entries(METRICS).reduce((agg, [key, browsertimeKey]) => ({
    ...agg,
    [key]: {
      value: get(browsertimeSource, [...browsertimeKey.split('.'), 'median'], 0),
    },
  }), {});

  return { metrics };
};
