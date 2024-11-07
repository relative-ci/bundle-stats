import type { ComponentProps, ElementType } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { SECTIONS, COMPONENT, type Job, ReportMetricRow } from '@bundle-stats/utils';
import escapeRegExp from 'lodash/escapeRegExp';
import { WebpackChunk } from '@bundle-stats/utils';

import type { ReportMetricModuleRow, SortAction } from '../../types';
import config from '../../config.json';
import I18N from '../../i18n';
import { MetricsDisplayType, ModuleSizeMetric, ModuleSizeMetrics } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Button } from '../../ui/button';
import { ControlGroup } from '../../ui/control-group';
import { Dialog, useDialogState } from '../../ui/dialog';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { Filters } from '../../ui/filters';
import { InputSearch } from '../../ui/input-search';
import { Tag } from '../../ui/tag';
import { Table } from '../../ui/table';
import { Toolbar } from '../../ui/toolbar';
import { Tooltip } from '../../ui/tooltip';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableExport } from '../metrics-table-export';
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTreemap, getTreemapNodes, getTreemapNodesGroupedByPath } from '../metrics-treemap';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import { generateFilterFieldsData } from './bundle-modules.utils';
import * as I18N_MODULES from './bundle-modules.i18n';
import css from './bundle-modules.module.css';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';

const DISPLAY_TYPE_GROUPS = {
  [MetricsDisplayType.TREEMAP]: ['folder'],
};

interface RowHeaderProps {
  row: ReportMetricRow;
  EntryComponentLink: ElementType;
}

const RowHeader = (props: RowHeaderProps) => {
  const { row, EntryComponentLink } = props;

  const moduleRow = row as ReportMetricModuleRow;

  return (
    <EntryComponentLink entryId={row.key} className={css.name}>
      {moduleRow.duplicated && (
        <Tag className={css.nameTagDuplicated} size="small" kind={Tag.KINDS.DANGER} />
      )}
      <FileName className={css.nameText} name={moduleRow.label} />
    </EntryComponentLink>
  );
};

interface ViewMetricsTreemapProps {
  metricsTableTitle: React.ReactNode;
  jobs: Array<any>;
  items: Array<any>;
  displayType: { value: MetricsDisplayType; groupBy?: string };
  emptyMessage: React.ReactNode;
  showEntryInfo: React.ComponentProps<typeof MetricsTreemap>['onItemClick'];
  updateSearch: (newSerarch: string) => void;
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
  }, [items, displayType]);

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

      updateSearch(newSearch);
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

interface BundleModulesProps extends React.ComponentProps<'div'> {
  jobs?: Array<Job>;
  items?: Array<ReportMetricModuleRow>;
  allItems?: Array<ReportMetricModuleRow>;
  chunks?: Array<WebpackChunk>;

  totalRowCount: number;

  updateFilters: () => void;
  resetFilters: () => void;
  resetAllFilters: () => void;
  filters: Record<string, boolean>;

  sort: any;
  updateSort: ({ field, direction }: SortAction) => void;

  search: string;
  updateSearch: (newSerarch: string) => void;

  entryId?: string;
  hideEntryInfo: () => void;
  showEntryInfo: (entryId: string) => void;

  moduleMetric: ModuleSizeMetric;
  setModuleMetric: (newValue: ModuleSizeMetric) => void;

  customComponentLink: React.ElementType;
}

export const BundleModules = (props: BundleModulesProps) => {
  const {
    className = '',
    jobs = [],
    items = [],
    allItems = [],
    chunks = [],
    totalRowCount = 0,
    updateFilters,
    resetFilters,
    resetAllFilters,
    filters,
    sort,
    updateSort,
    search,
    updateSearch,
    entryId,
    hideEntryInfo,
    moduleMetric,
    setModuleMetric,
    showEntryInfo,
    customComponentLink: CustomComponentLink = ComponentLink,
  } = props;

  const rootClassName = cx(css.root, className);
  const jobLabels = jobs?.map((job) => job?.label);

  const [displayType, setDisplayType] = useMetricsDisplayType(DISPLAY_TYPE_GROUPS);

  const filterFieldsData = useMemo(
    () => generateFilterFieldsData({ filters, chunks, compareMode: jobs.length > 1 }),
    [jobs, filters, chunks],
  );

  const EntryComponentLink = useCallback(
    ({
      entryId: moduleEntryId,
      ...moduleNameRestProps
    }: { entryId: string } & ComponentProps<typeof CustomComponentLink>) => (
      <CustomComponentLink
        section={SECTIONS.MODULES}
        params={{
          [COMPONENT.BUNDLE_MODULES]: {
            filters,
            search,
            metric: moduleMetric,
            entryId: moduleEntryId,
            sortBy: sort.field,
            direction: sort.direction,
          },
        }}
        {...moduleNameRestProps}
      />
    ),
    [CustomComponentLink, filters, search, sort, moduleMetric],
  );

  const metricsTableTitle = useMemo(
    () => (
      <MetricsTableTitle
        title={I18N.MODULES}
        info={`${items.length}/${totalRowCount}`}
        popoverInfo={I18N.MODULES_INFO}
        popoverHref={config.documentation.modules}
      />
    ),
    [items, totalRowCount],
  );

  const renderRowHeader = useCallback(
    (row: ReportMetricRow) => <RowHeader row={row} EntryComponentLink={EntryComponentLink} />,
    [EntryComponentLink],
  );

  const emptyMessage = useMemo(
    () => (
      <EmptySet
        resources="modules"
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
  const [exportSourceType, setExportSourceType] = useState<string | undefined>(undefined);

  const handleExportClick = useCallback((sourceType: string) => {
    setExportSourceType(sourceType);
    exportDialog.toggle();
  }, []);

  return (
    <>
      <Stack space="xsmall" as="section" className={rootClassName}>
        <Toolbar
          className={css.toolbar}
          renderActions={({ actionClassName }) => (
            <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
              <MetricsDisplaySelector
                onSelect={setDisplayType}
                value={displayType.value}
                groupBy={displayType.groupBy}
                groups={DISPLAY_TYPE_GROUPS}
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
              placeholder={I18N_MODULES.SEARCH}
              defaultValue={search}
              onChange={updateSearch}
            />
            <Filters
              className={css.tableDropdown}
              filters={filterFieldsData}
              onChange={updateFilters}
            />
          </FlexStack>
        </Toolbar>
        <Box outline as="main">
          <Box padding={['xsmall', 'small']} className={css.metricSelector}>
            <ControlGroup as="nav">
              <Button
                outline
                active={moduleMetric === ModuleSizeMetric.TOTAL_SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleSizeMetric.TOTAL_SIZE)}
              >
                <Tooltip title={ModuleSizeMetrics[ModuleSizeMetric.TOTAL_SIZE].tooltip}>
                  {ModuleSizeMetrics[ModuleSizeMetric.TOTAL_SIZE].label}
                </Tooltip>
              </Button>
              <Button
                outline
                active={moduleMetric === ModuleSizeMetric.DUPLICATE_SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleSizeMetric.DUPLICATE_SIZE)}
              >
                <Tooltip title={ModuleSizeMetrics[ModuleSizeMetric.DUPLICATE_SIZE].tooltip}>
                  {ModuleSizeMetrics[ModuleSizeMetric.DUPLICATE_SIZE].label}
                </Tooltip>
              </Button>
              <Button
                outline
                active={moduleMetric === ModuleSizeMetric.SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleSizeMetric.SIZE)}
              >
                <Tooltip title={ModuleSizeMetrics[ModuleSizeMetric.SIZE].tooltip}>
                  {ModuleSizeMetrics[ModuleSizeMetric.SIZE].label}
                </Tooltip>
              </Button>
            </ControlGroup>
          </Box>
          {displayType.value === MetricsDisplayType.TABLE && (
            <MetricsTable
              className={css.table}
              items={items}
              runs={jobs}
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
              metricsTableTitle={metricsTableTitle}
              jobs={jobs}
              items={items}
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
        <ModuleInfo
          className={css.moduleInfo}
          item={entryItem}
          chunks={chunks}
          chunkIds={chunks?.map(({ id }) => id)}
          labels={jobLabels}
          metricLabel={ModuleSizeMetrics[moduleMetric].label}
          customComponentLink={CustomComponentLink}
          onClose={hideEntryInfo}
        />
      )}

      <Dialog title={I18N.EXPORT} width="wide" state={exportDialog}>
        {exportDialog.open && (
          <MetricsTableExport
            items={items}
            initialSourceType={exportSourceType}
            download="bundle-stats--modules"
          />
        )}
      </Dialog>
    </>
  );
};
