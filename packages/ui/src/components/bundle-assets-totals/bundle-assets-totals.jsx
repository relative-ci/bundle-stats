import React from 'react';
import PropTypes from 'prop-types';
import { getBundleAssetsFileTypeComponentLink } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { MetricsTable } from '../metrics-table';
import { ComponentLink } from '../component-link';

export const BundleAssetsTotals = ({
  className,
  jobs,
  customComponentLink: CustomComponentLink,
  ...restProps
}) => {
  const items = webpack.compareBySection.sizes(jobs);

  const renderRowHeader = (item) => {
    const fileType = ASSETS_SIZES_FILE_TYPE_MAP[item.key];
    const { section, title, params } = getBundleAssetsFileTypeComponentLink(fileType, item.label);

    return (
      <CustomComponentLink section={section} title={title} params={params}>
        {item.label}
      </CustomComponentLink>
    );
  };

  return (
    <MetricsTable
      className={className}
      runs={jobs}
      items={items}
      renderRowHeader={renderRowHeader}
      showHeaderSum
      {...restProps}
    />
  );
};

BundleAssetsTotals.defaultProps = {
  className: '',
  jobs: [],
  customComponentLink: ComponentLink,
};

BundleAssetsTotals.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  customComponentLink: PropTypes.elementType,
};
