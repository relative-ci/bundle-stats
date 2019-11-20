import {
  get, isEmpty, merge, set,
} from 'lodash';

import { SOURCE_PATH_WEBPACK_STATS, SOURCE_PATHS } from '../config';
import { createStats } from '../stats/create';
import { createStatsSummary } from '../stats/create-summary';
import {
  extractModules,
  extractModulesPackages,
  extractModulesPackagesDuplicate,
  extractMeta,
} from '../webpack';

/*
 * Create job from stats
 */
export const createJob = (source, baseline) => {
  const data = SOURCE_PATHS.reduce((agg, rawDataPath) => {
    const rawData = get(source, rawDataPath);

    if (!rawData) {
      return agg;
    }

    return merge(
      {},
      agg,
      {
        rawData: set({}, rawDataPath, rawData),
      },
    );
  }, {});

  const stats = createStats(baseline && baseline.rawData, data.rawData);
  const summary = createStatsSummary(baseline && baseline.stats, stats);
  const { meta } = extractMeta(get(data.rawData, SOURCE_PATH_WEBPACK_STATS));

  const { warnings: duplicatePackagesWarnings } = extractModulesPackagesDuplicate(
    extractModulesPackages({
      ...extractModules(get(data.rawData, SOURCE_PATH_WEBPACK_STATS)),
    }),
  );

  const warnings = {
    ...duplicatePackagesWarnings,
  };

  return {
    ...data,
    meta,
    stats,
    summary,
    ...isEmpty(warnings) ? {} : { warnings },
  };
};
