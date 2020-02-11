import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';

const getRun = (job, index, jobs) => {
  const internalBuildNumber = get(job, 'internalBuildNumber', jobs.length - index);
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
  const items = webpack.compare.sizes(jobs);

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
