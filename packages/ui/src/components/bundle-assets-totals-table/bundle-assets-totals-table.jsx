import React from 'react';
import PropTypes from 'prop-types';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { MetricsTable } from '../metrics-table';

export const BundleAssetsTotalsTable = ({ className, jobs, renderRowHeader }) => {
  const items = webpack.compareBySection.sizes(jobs);

  return (
    <MetricsTable
      className={className}
      runs={jobs}
      items={items}
      renderRowHeader={renderRowHeader}
      showHeaderSum
    />
  );
};

BundleAssetsTotalsTable.defaultProps = {
  className: '',
  jobs: [],
  renderRowHeader: undefined,
};

BundleAssetsTotalsTable.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** MetricsTable renderRowHeader render prop */
  renderRowHeader: PropTypes.func,
};
