import React from 'react';
import PropTypes from 'prop-types';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { MetricsTable } from '../metrics-table';

export const BundleAssetsTotalsTable = ({ className, jobs }) => {
  const items = webpack.compareBySection.sizes(jobs);

  return (
    <MetricsTable
      className={className}
      runs={jobs}
      items={items}
      showHeaderSum
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
