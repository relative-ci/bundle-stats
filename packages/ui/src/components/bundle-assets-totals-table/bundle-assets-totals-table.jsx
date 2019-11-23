import React from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
import { METRIC_TYPE_FILE_SIZE, addMetricsData, mergeRunsById } from '@bundle-stats/utils';

import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';

const METRICS = [
  'webpack.sizes.totalSizeByTypeJS',
  'webpack.sizes.totalSizeByTypeCSS',
  'webpack.sizes.totalSizeByTypeIMG',
  'webpack.sizes.totalSizeByTypeMEDIA',
  'webpack.sizes.totalSizeByTypeFONT',
  'webpack.sizes.totalSizeByTypeHTML',
  'webpack.sizes.totalSizeByTypeOTHER',
  'webpack.totalSizeByTypeALL',
];

const getJobMetrics = (job) => METRICS.reduce((agg, metricKey) => {
  const metric = get(job, `metrics.${metricKey}`, { value: null });

  return { ...agg, [metricKey]: metric };
}, {});

const getRun = (job, index, jobs) => {
  const internalBuildNumber = get(job, 'meta.internalBuildNumber', jobs.length - index);
  const name = `Job #${internalBuildNumber}`;

  return {
    name,
    label: (
      <JobName
        title={index === 0 ? 'Current' : 'Baseline'}
        internalBuildNumber={internalBuildNumber}
      />
    ),
  };
};

export const BundleAssetsTotalsTable = ({ className, jobs }) => {
  const runs = jobs.map(getRun);
  const items = addMetricsData(mergeRunsById(map(jobs, getJobMetrics)), METRIC_TYPE_FILE_SIZE);

  return (
    <MetricsTable
      className={className}
      runs={runs}
      items={items}
    />
  );
};

BundleAssetsTotalsTable.defaultProps = {
  className: '',
  jobs: [],
};

BundleAssetsTotalsTable.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
