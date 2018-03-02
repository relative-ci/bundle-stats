import { get, isFunction, map, sum } from 'lodash';

const METRIC_GROUP = 'lighthouse';

const getMetric = (data, id) =>
  get(data, `${id}.rawValue`, 0);

const getScore = (res) => {
  const scores = map(res.reportCategories, 'score');

  return Math.round(sum(scores) / scores.length);
};

const metricsMap = {
  score: getScore,
  speedIndex: 'audits.speed-index-metric',
  firstMeaningfulPain: 'audits.first-meaningful-paint',
  timeToFirstByte: 'audits.time-to-first-byte',
  firstInteractive: 'audits.first-interactive',
  totalByteWeight: 'audits.total-byte-weight',
  domSize: 'audits.dom-size',
};

const metaMap = {
  timestamp: 'generatedTime',
  url: 'url',
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
