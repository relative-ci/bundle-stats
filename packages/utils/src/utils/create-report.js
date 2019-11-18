import {
  flatMap, get, isEmpty, map, uniq,
} from 'lodash';

import { METRIC_TYPE_FILE_SIZE, SOURCE_PATH_WEBPACK_STATS } from '../config';
import { getMetricChanged, getMetricType, mergeRunsById } from '../metrics';
import { getStatsByMetrics } from '../stats/get-stats-by-metrics';
import { getDelta, formatDelta } from './delta';
import { formatPercentage } from './format';
import {
  extractAssets,
  extractModules,
  extractModulesPackages,
  extractModulesPackagesDuplicate,
} from '../webpack';

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
  const { biggerIsBetter, label, formatter } = getMetricType(entry.key, metricType);

  return {
    ...entry,

    // Metric props
    biggerIsBetter,
    label,

    // Row props
    changed: getMetricChanged(runs),

    // Runs
    runs: runs.map((run, index) => {
      if (!run || typeof run.value === 'undefined') {
        return null;
      }

      const { value, ...restRun } = run;
      const diff = (index < runs.length - 1) ? getDelta(runs[index + 1], run) : null;

      return {
        ...restRun,

        // run data
        value,
        displayValue: formatter(run.value),

        // diff data
        ...(diff !== null) ? {
          ...diff,
          displayDelta: formatDelta(diff.delta, formatter),
          displayDeltaPercentage: formatDelta(diff.deltaPercentage, formatPercentage),
        } : {},
      };
    }),
  };
});

export const createRuns = (jobs) => jobs.map(({
  meta, internalBuildNumber, stats, rawData,
}) => {
  const webpackStats = get(rawData, SOURCE_PATH_WEBPACK_STATS);
  const { modules } = extractModules(webpackStats);

  return {
    meta: {
      ...meta,
      internalBuildNumber,
    },
    sizes: getStatsByMetrics(stats, SIZE_METRICS),
    ...extractAssets(webpackStats),
    modules,
    ...extractModulesPackages({ modules }),
  };
});

export const getModulesReport = (runs) => map(
  uniq(flatMap(runs, ({ modules }) => Object.keys(modules))),
  (chunkId) => ({
    chunkId,
    chunkNames: uniq(flatMap(runs, (run) => get(run, ['modules', chunkId, 'chunkNames']))),
    modules: addMetricsData(mergeRunsById(
      map(runs, (run) => get(run, ['modules', chunkId, 'modules'])),
    ), METRIC_TYPE_FILE_SIZE),
  }),
);

export const createReport = (jobs) => {
  const runs = createRuns(jobs);

  const { warnings: duplicatePackagesWarnings } = extractModulesPackagesDuplicate(
    get(runs, '[0]', {}),
  );

  const warnings = {
    ...duplicatePackagesWarnings,
  };

  return {
    runs: map(runs, 'meta'),
    ...!isEmpty(warnings) ? { warnings } : {},
    sizes: addMetricsData(mergeRunsById(map(runs, 'sizes'))),
    assets: addMetricsData(mergeRunsById(map(runs, 'assets')), METRIC_TYPE_FILE_SIZE),
    modules: getModulesReport(runs),
    packages: addMetricsData(mergeRunsById(map(runs, 'packages')), METRIC_TYPE_FILE_SIZE),
  };
};
