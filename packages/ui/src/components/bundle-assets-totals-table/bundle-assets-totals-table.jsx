import React from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';
import { addMetricsData, getStatsByMetrics, mergeRunsById } from '@bundle-stats/utils';

import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';

const METRICS = [
  'webpack.assets.totalSizeByTypeJS',
  'webpack.assets.totalSizeByTypeCSS',
  'webpack.assets.totalSizeByTypeIMG',
  'webpack.assets.totalSizeByTypeMEDIA',
  'webpack.assets.totalSizeByTypeFONT',
  'webpack.assets.totalSizeByTypeHTML',
  'webpack.assets.totalSizeByTypeOTHER',
  'webpack.assets.totalSizeByTypeALL',
];

const getRun = (job, index) => {
  const internalBuildNumber = get(job, 'internalBuildNumber');

  if (!internalBuildNumber) {
    return {
      label: ' ',
    };
  }

  return {
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
  const rows = addMetricsData(mergeRunsById(
    map(jobs, job => getStatsByMetrics(get(job, 'stats', {}), METRICS)),
  ));

  return (
    <MetricsTable
      className={className}
      rows={rows}
      runs={runs}
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
