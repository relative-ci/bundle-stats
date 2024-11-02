import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import escapeRegExp from 'lodash/escapeRegExp';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  FILE_TYPE_LABELS,
} from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { MetricsDisplayType } from '../../constants';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Dialog, useDialogState } from '../../ui/dialog';
import { InputSearch } from '../../ui/input-search';
import { Table } from '../../ui/table';
import { Filters } from '../../ui/filters';
import { EmptySet } from '../../ui/empty-set';
import { Toolbar } from '../../ui/toolbar';
import { AssetInfo } from '../asset-info';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableExport } from '../metrics-table-export';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTreemap, getTreemapNodes, getTreemapNodesGroupedByPath } from '../metrics-treemap';
import { SEARCH_PLACEHOLDER } from './bundle-assets.i18n';
import css from './bundle-assets.module.css';
import { AssetName } from '../asset-name';

const DISPLAY_TYPE_GROUPS = {
  [MetricsDisplayType.TREEMAP]: ['folder'],
};

const getFileTypeFilters = (filters) =>
  Object.entries(FILE_TYPE_LABELS).map(([key, label]) => ({
  key,
  label,
  defaultValue: get(filters, `${ASSET_FILE_TYPE}.${key}`, true),
}));

const getFilters = ({ compareMode, filters }) => ({
  [ASSET_FILTERS.CHANGED]: {
    label: 'Changed',
    defaultValue: filters[ASSET_FILTERS.CHANGED],
    disabled: !compareMode,
  },
  [ASSET_ENTRY_TYPE]: {
    label: 'Type',
    children: [
      {
        key: ASSET_FILTERS.ENTRY,
        label: 'Entry',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`, true),
      },
      {
        key: ASSET_FILTERS.INITIAL,
        label: 'Initial',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`, true),
      },
      {
        key: ASSET_FILTERS.CHUNK,
        label: 'Chunk',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`, true),
      },
      {
        key: ASSET_FILTERS.OTHER,
        label: 'Other',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.OTHER}`, true),
      },
    ],
  },
  [ASSET_FILE_TYPE]: {
    label: 'File type',
    children: getFileTypeFilters(filters),
  },
});

const ViewMetricsTreemap = (props) => {
  const {
    metricsTableTitle,
    jobs,
    items,
    displayType,
    emptyMessage,
    showEntryInfo,
    updateSearch,
    search,
  } = props;

  // Get treenodes based on group
  const treeNodes = useMemo(() => {
    if (displayType.groupBy === 'folder') {
      return getTreemapNodesGroupedByPath(items);
    }

    return getTreemapNodes(items);
  }, [items, displayType.groupBy]);

  // Search based on the group path on group title click
  const onGroupClick = useCallback(
    (groupPath) => {
      // Clear seach when groupPath is emty (root)
      if (groupPath === '') {
        updateSearch('');
        return;
      }
      // Search by group path
      // 1. use `^` to match only the string beggining
      // 2. add `/` suffix to exactly match the directory
      const newSearch = `^${escapeRegExp(groupPath)}/`;

      // Reset search when toggling the same groupPath
      if (newSearch === search) {
        updateSearch('');
        return;
      }

      updateSearch(`^${groupPath}/`);
    },
    [updateSearch, search],
  );

  return (
    <>
      <Table compact>
        <MetricsTableHeader metricTitle={metricsTableTitle} showSum jobs={jobs} rows={items} />
      </Table>
      <MetricsTreemap
        treeNodes={treeNodes}
        nested={Boolean(displayType.groupBy)}
        emptyMessage={emptyMessage}
        onItemClick={showEntryInfo}
        onGroupClick={onGroupClick}
      />
    </>
  );
};

ViewMetricsTreemap.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  metricsTableTitle: PropTypes.node.isRequired,
  displayType: PropTypes.shape({
    groupBy: PropTypes.string,
  }).isRequired,
  emptyMessage: PropTypes.node.isRequired,
  showEntryInfo: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export const BundleAssets = (props) => {
  const {
    className,
    jobs,
    chunks,
    items,
    allItems,
    updateFilters,
    resetFilters,
    resetAllFilters,
    totalRowCount,
    filters,
    entryId,
    hasActiveFilters,
    sort,
    updateSort,
    search,
    updateSearch,
    customComponentLink: CustomComponentLink,
    hideEntryInfo,
    showEntryInfo,
  } = props;

  const jobLabels = jobs?.map((job) => job?.label);

  const [displayType, setDisplayType] = useMetricsDisplayType(DISPLAY_TYPE_GROUPS);

  const dropdownFilters = useMemo(
    () => getFilters({ compareMode: jobs?.length > 1, filters }),
    [jobs, filters],
  );

  const metricsTableTitle = useMemo(
    () => (
      <MetricsTableTitle
        title={I18N.ASSETS}
        info={`${items.length}/${totalRowCount}`}
        popoverInfo={I18N.ASSETS_INFO}
        popoverHref={config.documentation.assets}
      />
    ),
    [items, totalRowCount],
  );

  const renderRowHeader = useCallback(
    (row) => (
      <AssetName
        row={row}
        customComponentLink={CustomComponentLink}
        filters={filters}
        search={search}
        className={css.assetName}
      />
    ),
    [CustomComponentLink, filters, search],
  );

  const emptyMessage = useMemo(
    () => (
      <EmptySet
        resources="assets"
        filtered={totalRowCount !== 0}
        handleResetFilters={resetFilters}
        handleViewAll={resetAllFilters}
      />
    ),
    [totalRowCount, resetFilters, resetAllFilters],
  );

  const entryItem = useMemo(() => {
    if (!entryId) {
      return null;
    }

    return allItems.find(({ key }) => key === entryId);
  }, [allItems, entryId]);

  const exportDialog = useDialogState();
  const [exportSourceType, setExportSourceType] = useState(undefined);

  const handleExportClick = useCallback((sourceType) => {
    setExportSourceType(sourceType);
    exportDialog.toggle();
  }, []);

  return (
    <>
      <Stack space="xsmall" as="section" className={cx(css.root, className)}>
        <Toolbar
          renderActions={({ actionClassName }) => (
            <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
              <MetricsDisplaySelector
                value={displayType.value}
                groupBy={displayType.groupBy}
                groups={DISPLAY_TYPE_GROUPS}
                onSelect={setDisplayType}
              />
              <MetricsTableOptions
                onViewAllClick={resetAllFilters}
                onResetClick={resetFilters}
                onExportClick={handleExportClick}
              />
            </FlexStack>
          )}
        >
          <FlexStack space="xxsmall">
            <InputSearch
              className={css.toolbarSearch}
              placeholder={SEARCH_PLACEHOLDER}
              defaultValue={search}
              onChange={updateSearch}
            />
            <Filters
              className={css.toolbarFilters}
              filters={dropdownFilters}
              hasActiveFilters={hasActiveFilters}
              onChange={updateFilters}
            />
          </FlexStack>
        </Toolbar>
        <Box outline as="main">
          {displayType.value === MetricsDisplayType.TABLE && (
            <MetricsTable
              runs={jobs}
              items={items}
              renderRowHeader={renderRowHeader}
              emptyMessage={emptyMessage}
              showHeaderSum
              title={metricsTableTitle}
              sort={sort}
              updateSort={updateSort}
            />
          )}
          {displayType.value === MetricsDisplayType.TREEMAP && (
            <ViewMetricsTreemap
              jobs={jobs}
              items={items}
              metricsTableTitle={metricsTableTitle}
              displayType={displayType}
              emptyMessage={emptyMessage}
              showEntryInfo={showEntryInfo}
              updateSearch={updateSearch}
              search={search}
            />
          )}
        </Box>
      </Stack>

      {entryItem && (
        <AssetInfo
          className={css.assetInfo}
          item={entryItem}
          labels={jobLabels}
          chunks={chunks}
          customComponentLink={CustomComponentLink}
          onClose={hideEntryInfo}
        />
      )}

      <Dialog title={I18N.EXPORT} width="wide" state={exportDialog}>
        {exportDialog.open && (
          <MetricsTableExport
            items={items}
            initialSourceType={exportSourceType}
            download="bundle-stats--assets"
          />
        )}
      </Dialog>
    </>
  );
};

BundleAssets.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
  entryId: '',
};

BundleAssets.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  chunks: PropTypes.arrayOf({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      runs: PropTypes.arrayOf(
        PropTypes.shape({
          displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
      ),
    }),
  ).isRequired,
  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
  filters: PropTypes.shape({
    changed: PropTypes.bool,
    id: PropTypes.string,
  }).isRequired,
  entryId: PropTypes.string,
  hasActiveFilters: PropTypes.bool,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  allItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
    }),
  ).isRequired,
  customComponentLink: PropTypes.elementType,
  hideEntryInfo: PropTypes.func.isRequired,
  showEntryInfo: PropTypes.func.isRequired,
};
