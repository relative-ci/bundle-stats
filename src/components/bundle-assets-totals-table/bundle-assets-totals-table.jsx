import React from 'react';
import PropTypes from 'prop-types';
import { map, orderBy, omit } from 'lodash';
import { flow } from 'lodash/fp';
import { mergeRunsById } from '@relative-ci/utils';

import resolveMetricChanged from '../../utils/resolve-metric-changed';
import computeDelta from '../../utils/compute-delta';

// @TODO update
// import { JobTableHeader } from '../job-table-header';
import { MetricsTable } from '../metrics-table';

const JobTableHeader = () => null;

const prefixStats = data =>
  Object.entries(data).map(([key, value]) => ({
    [`webpack.assets.${key}`]: value,
  })).reduce((aggregator, current) => ({
    ...aggregator,
    ...current,
  }), {});

const getRun = (job, index) => {
  if (!job) {
    return {
      label: ' ',
      data: [],
    };
  }

  // @TODO Replace with a proper separation
  const totals = omit({ ...job.stats.webpack.assets }, [
    'totalInitialSizeJS',
    'totalInitialSizeCSS',
  ]);

  return {
    label: index > 0 ? <JobTableHeader label="Baseline" job={job} /> : ' ',
    data: prefixStats(totals),
  };
};

export const BundleAssetsTotalsTable = ({ className, jobs }) => {
  const runs = jobs.map(getRun);

  const rows = flow(
    mergeRunsById,
    resolveMetricChanged,
    computeDelta,
  )(map(runs, 'data'));

  const orderedRows = orderBy(rows, ['key']);

  return (
    <MetricsTable
      className={className}
      rows={orderedRows}
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
