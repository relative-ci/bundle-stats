import type { ElementType, ReactNode } from 'react';
import React, { ComponentProps, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import escapeRegExp from 'lodash/escapeRegExp';
import type { Job, ReportMetricRow, WebpackChunk } from '@bundle-stats/utils';
import { COMPONENT, SECTIONS } from '@bundle-stats/utils';

import type { ReportMetricAssetRow, SortAction } from '../../types';
import config from '../../config.json';
import I18N from '../../i18n';
import { MetricsDisplayGroupBy, MetricsDisplayType } from '../../constants';
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
import { AssetName } from '../asset-name';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableExport } from '../metrics-table-export';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTreemap, getTreemapNodes, getTreemapNodesGroupedByPath } from '../metrics-treemap';
import * as BUNDLE_ASSETS_I18N from './bundle-assets.i18n';
import { getFilters } from './bundle-assets.utils';
import css from './bundle-assets.module.css';

const DISPLAY_TYPE_GROUPS = {
  [MetricsDisplayType.TREEMAP]: [MetricsDisplayGroupBy.FOLDER],
};

interface ViewMetricsTreemapProps {
  metricsTableTitle: ReactNode;
  jobs: Array<Job>;
  items: Array<ReportMetricAssetRow>;
  displayType: { value: MetricsDisplayType; groupBy?: string };
  emptyMessage: ReactNode;
  showEntryInfo: (entryId: string) => void;
  updateSearch: (search: string) => void;
  search: string;
}

const ViewMetricsTreemap = (props: ViewMetricsTreemapProps) => {
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
    (groupPath: string) => {
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

export interface BundleAssetsProps extends ComponentProps<typeof Stack> {
  jobs: Array<Job>;
  chunks: Array<WebpackChunk>;
  items: Array<ReportMetricAssetRow>;
  allItems: Array<ReportMetricAssetRow>;
  filters: Record<string, boolean>;
  updateFilters: (newFilters: Record<string, boolean>) => void;
  resetFilters: () => void;
  resetAllFilters: () => void;
  totalRowCount?: number;
  entryId?: string;
  sort: SortAction;
  updateSort: (params: SortAction) => void;
  search: string;
  updateSearch: (search: string) => void;
  customComponentLink?: ElementType;
  hideEntryInfo: () => void;
  showEntryInfo: (entryId: string) => void;
}

export const BundleAssets = (props: BundleAssetsProps) => {
  const {
    className = '',
    jobs,
    chunks,
    items,
    allItems,
    updateFilters,
    resetFilters,
    resetAllFilters,
    totalRowCount = 0,
    filters,
    entryId = '',
    sort,
    updateSort,
    search,
    updateSearch,
    customComponentLink: CustomComponentLink = ComponentLink,
    hideEntryInfo,
    showEntryInfo,
  } = props;

  const jobLabels = jobs?.map((job) => job?.label);

  const [displayType, setDisplayType] = useMetricsDisplayType(DISPLAY_TYPE_GROUPS);

  const filterFieldsData = useMemo(
    () => getFilters({ compareMode: jobs?.length > 1, filters, chunks }),
    [jobs, filters, chunks],
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

  const EntryComponentLink = useCallback(
    ({
      entryId: assetEntryId,
      ...assetNameRestProps
    }: { entryId: string } & ComponentProps<typeof CustomComponentLink>) => (
      <CustomComponentLink
        section={SECTIONS.ASSETS}
        params={{
          [COMPONENT.BUNDLE_ASSETS]: {
            filters,
            search,
            entryId: assetEntryId,
            sortBy: sort.field,
            direction: sort.direction,
          },
        }}
        {...assetNameRestProps}
      />
    ),
    [CustomComponentLink, filters, search, sort],
  );

  const renderRowHeader = useCallback(
    (row: ReportMetricRow) => (
      <AssetName
        row={row as ReportMetricAssetRow}
        EntryComponentLink={EntryComponentLink}
        className={css.assetName}
      />
    ),
    [EntryComponentLink],
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
  const [exportSourceType, setExportSourceType] = useState<string>();

  const handleExportClick = useCallback(
    (sourceType: string) => {
      setExportSourceType(sourceType);
      exportDialog.toggle();
    },
    [exportDialog, setExportSourceType],
  );

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
              placeholder={BUNDLE_ASSETS_I18N.SEARCH_PLACEHOLDER}
              defaultValue={search}
              onChange={updateSearch}
            />
            <Filters
              className={css.toolbarFilters}
              filters={filterFieldsData}
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
