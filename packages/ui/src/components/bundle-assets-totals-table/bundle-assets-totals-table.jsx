import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { MetricsTable } from '../metrics-table';
import { RunLabelSum } from '../run-label-sum';
import { JobName } from '../job-name';

import css from './bundle-assets-totals-table.module.css';

const getRun = (items) => (job, index, jobs) => {
  const internalBuildNumber = get(job, 'internalBuildNumber', jobs.length - index);
  const name = `Job #${internalBuildNumber}`;

  return {
    name,
    label: (
      <div className={css.tableHeaderRun}>
        <JobName
          title={index === 0 ? 'Current' : 'Baseline'}
          internalBuildNumber={internalBuildNumber}
        />
        <RunLabelSum
          className={css.tableHeaderRunMetric}
          runIndex={index}
          runCount={jobs.length}
          rows={items}
        />
      </div>
    ),
  };
};

export const BundleAssetsTotalsTable = ({ className, jobs }) => {
  const items = webpack.compare.sizes(jobs);
  const runs = jobs.map(getRun(items));

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
