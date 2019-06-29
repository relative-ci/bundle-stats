import { map } from 'lodash';

import { createJobs } from '../jobs/create';
import { getMetricChanged, mergeRunsById } from '../metrics';
import { getStatsByMetrics } from '../stats/get-stats-by-metrics';
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

export const addMetricsData = entries => entries.map((entry) => {
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

export const createRuns = (jobs) => jobs.map(({ internalBuildNumber, stats }) => ({
  meta: {
    internalBuildNumber,
  },
  sizes: getStatsByMetrics(stats, SIZE_METRICS),
}));

export const createReport = (runs) => ({
  runs: map(runs, 'meta'),
  sizes: addMetricsData(mergeRunsById(map(runs, 'sizes'))),
})

export const createJSONReport = (sources) => {
  const jobs = createJobs(sources);
  const runs = createRuns(jobs);
  const output = createReport(runs);

  return JSON.stringify(output, null, 2);
};
