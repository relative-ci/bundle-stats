import { compose, withProps } from 'recompose';
import {
  get, map, mean, round,
} from 'lodash';
import { addMetricsData, mergeRunsById } from '@bundle-stats/utils';

const getScore = (res) => {
  const scores = map(res.reportCategories, 'score');
  return round(mean(scores), 2);
};

const METRICS = {
  'lighthouse.score': getScore,
  'lighthouse.speedIndex': 'audits.speed-index-metric.rawValue',
  'lighthouse.firstMeaningfulPain': 'audits.first-meaningful-paint.rawValue',
  'lighthouse.timeToFirstByte': 'audits.time-to-first-byte.rawValue',
  'lighthouse.firstInteractive': 'audits.first-interactive.rawValue',
  'lighthouse.totalByteWeight': 'audits.total-byte-weight.rawValue',
  'lighthouse.domSize': 'audits.dom-size.rawValue',
};

const getLighthouseMetrics = (data) => {
  if (!data) {
    return {};
  }

  return Object.entries(METRICS)
    .reduce((agg, [metricKey, metricPath]) => ({
      ...agg,
      [metricKey]: {
        value: typeof metricPath === 'function' ? metricPath(data) : get(data, metricPath, 0),
      },
    }), {});
};

export const enhance = compose(
  withProps(({ jobs }) => {
    const runs = jobs.map(job => ({
      meta: job,
      lighthouse: getLighthouseMetrics(get(job, 'rawData.lighthouse')),
    }));

    const items = addMetricsData(mergeRunsById(map(runs, 'lighthouse')));

    return {
      runs,
      items,
    };
  }),
);
