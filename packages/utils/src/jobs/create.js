import {
  get, isEmpty, last, merge, omit, set, reverse,
} from 'lodash';

import { createStats } from '../stats/create';
import { createStatsSummary } from '../stats/create-summary';
import {
  duplicatePackagesBundleTransform,
  metaWebpackTransform,
  modulesWebpackTransform,
  packagesModulesBundleTransform,
} from '../transforms';

const RAW_DATA_IDS = ['webpack.stats'];
const SOURCE_IDS = RAW_DATA_IDS.map((id) => id.split('.')[0]);

/*
 * Create job from stats
 */
export const createJob = (source, baseline) => {
  const data = RAW_DATA_IDS.reduce((agg, rawDataPath) => {
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
  }, omit(source, SOURCE_IDS)); // @TODO Why ?

  const stats = createStats(baseline && baseline.rawData, data.rawData);
  const summary = createStatsSummary(baseline && baseline.stats, stats);
  const { meta } = metaWebpackTransform(get(data, 'rawData.webpack.stats'));

  const { warnings: duplicatePackagesWarnings } = duplicatePackagesBundleTransform(
    packagesModulesBundleTransform({
      ...modulesWebpackTransform(get(data, 'rawData.webpack.stats')),
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

/*
 * Create jobs from sources
 */
export const createJobs = (sources) => {
  const jobs = reverse([...sources]).reduce((agg, source, idx) => [
    {
      ...createJob(source, last(agg)),
      internalBuildNumber: (idx + 1),
    },
    ...agg,
  ], []);

  return jobs;
};
