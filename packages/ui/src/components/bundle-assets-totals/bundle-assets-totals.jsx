import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getBundleAssetsFileTypeComponentLink,
  getComponentStateQueryString,
} from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import config from '../../config.json';
import { ASSETS_SIZES_FILE_TYPE_MAP, SECTION_URLS, MetricsDisplayType } from '../../constants';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';
import I18N from '../../i18n';
import { Toolbar } from '../../ui/toolbar';
import { Table } from '../../ui/table';
import { Box } from '../../layout/box';
import { Stack } from '../../layout/stack';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTable } from '../metrics-table';
import { MetricsTableTitle } from '../metrics-table-title';
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTreemap, getTreemapNodes } from '../metrics-treemap';
import { ComponentLink } from '../component-link';

const metricsTableTitle = (
  <MetricsTableTitle
    title={I18N.ASSET_TOTALS}
    popoverInfo={I18N.ASSET_TOTALS_INFO}
    popoverHref={config.documentation.assets}
  />
);

export const BundleAssetsTotals = ({
  className,
  jobs,
  customComponentLink: CustomComponentLink,
  onTreemapItemClick,
  ...restProps
}) => {
  const [displayType, setDisplayType] = useMetricsDisplayType();
  const history = useHistory();

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
    <Stack space="xsmall" as="section" className={className}>
      <Toolbar
        renderActions={() => (
          <MetricsDisplaySelector onSelect={setDisplayType} value={displayType.value} />
        )}
      />
      <Box outline as="main">
        {displayType.value === MetricsDisplayType.TABLE && (
          <MetricsTable
            title={metricsTableTitle}
            runs={jobs}
            items={items}
            renderRowHeader={renderRowHeader}
            showHeaderSum
            {...restProps}
          />
        )}
        {displayType.value === MetricsDisplayType.TREEMAP && (
          <>
            <Table compact>
              <MetricsTableHeader
                metricTitle={metricsTableTitle}
                showSum
                jobs={jobs}
                rows={items}
              />
            </Table>
            <MetricsTreemap
              items={items}
              treeNodes={getTreemapNodes(items)}
              onItemClick={onTreemapItemClick || handleMetricsTreemapItemClick}
            />
          </>
        )}
      </Box>
    </Stack>
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
