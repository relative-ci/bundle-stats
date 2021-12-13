import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getBundleAssetsFileTypeComponentLink } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { MetricsTable } from '../metrics-table';
import { ComponentLink } from '../component-link';

export const BundleAssetsTotalsTable = ({
  className,
  jobs,
  customComponentLink: CustomComponentLink,
}) => {
  const items = useMemo(() => webpack.compareBySection.sizes(jobs), [jobs]);

  const renderRowHeader = useCallback(
    (item) => {
      const fileType = ASSETS_SIZES_FILE_TYPE_MAP[item.key];
      const { section, title, params } = getBundleAssetsFileTypeComponentLink(fileType, item.label);

      return (
        <CustomComponentLink section={section} title={title} params={params}>
          {item.label}
        </CustomComponentLink>
      );
    },
    [CustomComponentLink],
  );

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
  customComponentLink: ComponentLink,
};

BundleAssetsTotalsTable.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  customComponentLink: PropTypes.elementType,
};
