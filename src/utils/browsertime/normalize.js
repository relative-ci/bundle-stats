import { get, isFunction } from 'lodash';

const METRIC_GROUP = 'browsertime';

const getMetric = (data, id) =>
  get(data, `statistics.${id}.median`, 0);

const metricsMap = {
  firstPaint: 'timings.firstPaint',
  fullyLoaded: 'timings.fullyLoaded',
  backEndTime: 'timings.pageTimings.backEndTime',
  domContentLoadedTime: 'timings.pageTimings.domContentLoadedTime',
  domInteractiveTime: 'timings.pageTimings.domInteractiveTime',
  domainLookupTime: 'timings.pageTimings.domainLookupTime',
  frontEndTime: 'timings.pageTimings.frontEndTime',
  pageDownloadTime: 'timings.pageTimings.pageDownloadTime',
  pageLoadTime: 'timings.pageTimings.pageLoadTime',
  redirectionTime: 'timings.pageTimings.redirectionTime',
  serverConnectionTime: 'timings.pageTimings.serverConnectionTime',
  serverResponseTime: 'timings.pageTimings.serverResponseTime',
  firstContentfulPaint: 'timings.paintTiming.first-contentful-paint',
  rumSpeedIndex: 'timings.rumSpeedIndex',
  firstVisualChange: 'visualMetrics.FirstVisualChange',
  lastVisualChange: 'visualMetrics.LastVisualChange',
  perceptualSpeedIndex: 'visualMetrics.PerceptualSpeedIndex',
  speedIndex: 'visualMetrics.SpeedIndex',
  visualComplete85: 'visualMetrics.VisualComplete85',
  visualComplete95: 'visualMetrics.VisualComplete95',
  visualComplete99: 'visualMetrics.VisualComplete99',
};

const metaMap = {
  timestamp: 'info.timestamp',
  url: 'info.url',
  connectivity: 'info.connectivity.profile',
};

const getMetrics = res =>
  Object.entries(metricsMap).reduce((aggregator, [internalId, id]) => ({
    ...aggregator,
    [`${METRIC_GROUP}.${internalId}`]: {
      value: isFunction(id) ? id(res) : getMetric(res, id),
    },
  }), {});

const getMeta = res =>
  Object.entries(metaMap).reduce((aggregator, [name, key]) => ({
    ...aggregator,
    [name]: get(res, key),
  }), {});


const normalizeSource = ({ loading, error, res }, index) => {
  if (loading || error) {
    return {};
  }

  return {
    label: `Run #${index}`,
    meta: getMeta(res),
    data: getMetrics(res),
  };
};

const normalize = sources => sources.map(normalizeSource);

export default normalize;
