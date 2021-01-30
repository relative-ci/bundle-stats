import React from 'react';
import PropTypes from 'prop-types';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { getBundleAssetsFileTypeComponentLink } from '../../component-links';
import { MetricsTable } from '../metrics-table';
import { ComponentLink } from '../component-link';

export const BundleAssetsTotalsTable = ({ className, jobs }) => {
  const items = webpack.compareBySection.sizes(jobs);

  const renderRowHeader = (item) => {
    const fileType = ASSETS_SIZES_FILE_TYPE_MAP[item.key];
    const { section, title, params } = getBundleAssetsFileTypeComponentLink(fileType, item.label);

    return (
      <ComponentLink section={section} title={title} params={params}>
        {item.label}
      </ComponentLink>
    );
  };

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
};

BundleAssetsTotalsTable.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
