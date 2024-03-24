import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getBundleAssetsFileTypeComponentLink,
  getComponentStateQueryString,
} from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ASSETS_SIZES_FILE_TYPE_MAP, SECTION_URLS, MetricsDisplayType } from '../../constants';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';
import { Toolbar } from '../../ui/toolbar';
import { MetricsTreemap } from '../metrics-treemap';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { TotalSizeTypeTitle } from '../total-size-type-title';
import { MetricsTable } from '../metrics-table';
import { ComponentLink } from '../component-link';
import css from './bundle-assets-totals.module.css';

export const BundleAssetsTotals = ({
  className,
  jobs,
  customComponentLink: CustomComponentLink,
  onTreemapItemClick,
  ...restProps
}) => {
  const [displayType, setDisplayType] = useMetricsDisplayType();
  const history = useHistory();

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

  const handleMetricsTreemapItemClick = useCallback(
    (entryId) => {
      const fileType = ASSETS_SIZES_FILE_TYPE_MAP[entryId];
      const { section, params } = getBundleAssetsFileTypeComponentLink(fileType, '');
      const queryParams = getComponentStateQueryString(params);

      const nextUrl = `${SECTION_URLS[section]}?${queryParams}`;
      history.push(nextUrl);
    },
    [history],
  );

  return (
    <div className={className}>
      <Toolbar
        className={css.toolbar}
        renderActions={() => (
          <MetricsDisplaySelector onSelect={setDisplayType} value={displayType} />
        )}
      >
        <TotalSizeTypeTitle />
      </Toolbar>
      {displayType === MetricsDisplayType.TABLE && (
        <MetricsTable
          runs={jobs}
          items={items}
          renderRowHeader={renderRowHeader}
          showHeaderSum
          {...restProps}
        />
      )}
      {displayType === MetricsDisplayType.TREEMAP && (
        <MetricsTreemap
          items={items}
          onItemClick={onTreemapItemClick || handleMetricsTreemapItemClick}
        />
      )}
    </div>
  );
};

BundleAssetsTotals.defaultProps = {
  className: '',
  jobs: [],
  customComponentLink: ComponentLink,
  onTreemapItemClick: undefined,
};

BundleAssetsTotals.propTypes = {
  /** Addopted child class name */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  customComponentLink: PropTypes.elementType,

  /**
   * Treemap item onClick
   */
  onTreemapItemClick: PropTypes.func,
};
