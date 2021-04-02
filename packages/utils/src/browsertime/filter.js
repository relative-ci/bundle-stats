import get from 'lodash/get';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import set from 'lodash/set';

const META_KEYS = [
  'info.browsertime.version',
  'info.timestamp',
  'info.url',
];

const METRICS_KEYS = [
  'statistics.timings.firstPaint',
  'statistics.timings.fullyLoaded',
  'statistics.timings.pageTimings.backEndTime',
  'statistics.timings.pageTimings.domContentLoadedTime',
  'statistics.timings.pageTimings.domInteractiveTime',
  'statistics.timings.pageTimings.domainLookupTime',
  'statistics.timings.pageTimings.frontEndTime',
  'statistics.timings.pageTimings.pageDownloadTime',
  'statistics.timings.pageTimings.pageLoadTime',
  'statistics.timings.pageTimings.redirectionTime',
  'statistics.timings.pageTimings.serverConnectionTime',
  'statistics.timings.pageTimings.serverResponseTime',
  'statistics.timings.paintTiming.first-contentful-paint',
  'statistics.timings.rumSpeedIndex',
  'statistics.visualMetrics.FirstVisualChange',
  'statistics.visualMetrics.LastVisualChange',
  'statistics.visualMetrics.PerceptualSpeedIndex',
  'statistics.visualMetrics.SpeedIndex',
  'statistics.visualMetrics.VisualComplete85',
  'statistics.visualMetrics.VisualComplete95',
  'statistics.visualMetrics.VisualComplete99',
];

/**
 * Filter Browsertime stats
 *
 *  @param {Object} browsertimeSource
 *  @return {import("../../types").BrowsertimeSource}
 */
export const filter = (browsertimeSource) => {
  const meta = META_KEYS.reduce((agg, key) => {
    // Browsertime is proving an array of results
    const metaData = get(browsertimeSource, [0, ...key.split('.')], '');
    const filteredMetaData = set({}, key, metaData);
    return merge({}, agg, filteredMetaData);
  }, {});

  const metrics = METRICS_KEYS.reduce((agg, key) => {
    // Browsertime is proving an array of results
    const metricData = pick(
      get(browsertimeSource, [0, ...key.split('.')], {}),
      ['median'],
    );
    const filteredMetricData = set({}, key, metricData);

    return merge({}, agg, filteredMetricData);
  }, {});

  return { ...meta, ...metrics };
};
