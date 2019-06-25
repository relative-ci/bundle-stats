import { map } from 'lodash';

import { createJobs } from '../jobs';
import { getMetricChanged, mergeRunsById } from '../metrics';
import { getDelta, formatDelta } from './delta';
import { getMetric } from './metrics';

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

const generateSizeMetrics = stats => SIZE_METRICS.reduce((agg, metricId) => {
  const value = get(stats, `${metricId}.value`, 0);

  return {
    ...agg,
    [metricId]: { value },
  };
}, {});

const addMetricsData = entries => entries.map((entry) => {
  const { runs } = entry;
  const { biggerIsBetter, label, formatter } = getMetric(entry.key);

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

export const createJSONReport = (sources) => {
  const jobs = createJobs(sources);
  const runs = jobs.map(({ internalBuildNumber, stats }) => ({
    meta: {
      internalBuildNumber,
    },
    sizes: generateSizeMetrics(stats),
  }));

  const output = {
    runs: map(runs, 'meta'),
    sizes: addMetricsData(mergeRunsById(map(runs, 'sizes'))),
  };

  return JSON.stringify(output, null, 2);
};
