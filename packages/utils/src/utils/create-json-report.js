import { get, map } from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../config/metrics';
import { createJobs } from '../jobs/create';
import { getMetricChanged, mergeRunsById } from '../metrics';
import { getStatsByMetrics } from '../stats/get-stats-by-metrics';
import { getDelta, formatDelta } from './delta';
import { getMetric } from './metrics';
import { getAssetsMetrics } from './get-assets-metrics';

const SIZE_METRICS = [
  'webpack.assets.totalSizeByTypeJS',
  'webpack.assets.totalSizeByTypeCSS',
  'webpack.assets.totalSizeByTypeIMG',
  'webpack.assets.totalSizeByTypeMEDIA',
  'webpack.assets.totalSizeByTypeFONT',
  'webpack.assets.totalSizeByTypeHTML',
  'webpack.assets.totalSizeByTypeOTHER',
  'webpack.assets.totalSizeByTypeALL',
  'webpack.assets.totalInitialSizeCSS',
  'webpack.assets.totalInitialSizeJS',
];

export const addMetricsData = (entries, metricType) => entries.map((entry) => {
  const { runs } = entry;
  const { biggerIsBetter, label, formatter } = getMetric(entry.key, metricType);

  return {
    ...entry,

    // Metric props
    biggerIsBetter,
    label,

    // Row props
    changed: getMetricChanged(runs),

    // Runs
    runs: runs.map((run, index) => {
      const { value } = run;
      const delta = (index < runs.length - 1) ? getDelta(runs[index + 1], run) : null;

      return {
        value,
        displayValue: formatter(run.value),
        ...(delta !== null) ? {
          delta,
          displayDelta: formatDelta(delta),
        } : {},
      };
    }),
  };
});

export const createRuns = jobs => jobs.map(({ internalBuildNumber, stats, rawData }) => ({
  meta: {
    internalBuildNumber,
  },
  sizes: getStatsByMetrics(stats, SIZE_METRICS),
  assets: getAssetsMetrics(get(rawData, 'webpack.stats.assets')),
}));

export const createReport = runs => ({
  runs: map(runs, 'meta'),
  sizes: addMetricsData(mergeRunsById(map(runs, 'sizes'))),
  assets: addMetricsData(mergeRunsById(map(runs, 'assets')), METRIC_TYPE_FILE_SIZE),
});

export const createJSONReport = (sources) => {
  const jobs = createJobs(sources);
  const runs = createRuns(jobs);
  const output = createReport(runs);

  return JSON.stringify(output, null, 2);
};
