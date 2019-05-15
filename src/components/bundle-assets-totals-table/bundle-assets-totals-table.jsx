import React from 'react';
import PropTypes from 'prop-types';
import {
  get, isEmpty, pick,
} from 'lodash';

import { generateRows } from '../../utils/generate-rows';
import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';

const METRICS = [
  'totalSizeByTypeJS',
  'totalSizeByTypeCSS',
  'totalSizeByTypeIMG',
  'totalSizeByTypeMEDIA',
  'totalSizeByTypeFONT',
  'totalSizeByTypeHTML',
  'totalSizeByTypeOTHER',
  'totalSizeByTypeALL',
];

const prefixStats = data => Object.entries(data).map(([key, value]) => ({
  [`webpack.assets.${key}`]: value,
})).reduce((aggregator, current) => ({
  ...aggregator,
  ...current,
}), {});

const getRun = (job, index) => {
  const data = get(job, ['stats', 'webpack', 'assets'], {});
  const internalBuildNumber = get(job, 'internalBuildNumber');

  const label = internalBuildNumber ? (
    <JobName
      title={index === 0 ? 'Current' : 'Baseline'}
      internalBuildNumber={job.internalBuildNumber}
    />
  ) : ' ';

  if (isEmpty(data)) {
    return { label };
  }

  const totals = pick(data, METRICS);

  return {
    label,
    data: prefixStats(totals),
  };
};

export const BundleAssetsTotalsTable = ({ className, jobs }) => {
  const runs = jobs.map(getRun);
  const rows = generateRows(runs);

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
