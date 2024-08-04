import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';
import { SECTIONS, COMPONENT, type Job, ReportMetricRow } from '@bundle-stats/utils';
import escapeRegExp from 'lodash/escapeRegExp';

import { WebpackChunk } from '@bundle-stats/utils';
import type { ReportMetricModuleRow, SortAction } from '../../types';
import config from '../../config.json';
import I18N from '../../i18n';
import { MetricsDisplayType } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Button } from '../../ui/button';
import { ControlGroup } from '../../ui/control-group';
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
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTreemap, getTreemapNodes, getTreemapNodesGroupedByPath } from '../metrics-treemap';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import { generateFilterFieldsData } from './bundle-modules.utils';
import { ModuleMetric } from './bundle-modules.constants';
import * as I18N_MODULES from './bundle-modules.i18n';
import css from './bundle-modules.module.css';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';

const DISPLAY_TYPE_GROUPS = {
  [MetricsDisplayType.TREEMAP]: ['folder'],
};

interface RowHeaderProps {
  row: ReportMetricRow;
  filters?: any;
  search?: string;
  moduleMetric?: string;
  customComponentLink: React.ElementType;
}

const RowHeader = (props: RowHeaderProps) => {
  const { row, filters, search, moduleMetric, customComponentLink: CustomComponentLink } = props;

  const moduleRow = row as ReportMetricModuleRow;

  return (
    <CustomComponentLink
      section={SECTIONS.MODULES}
      params={{
        [COMPONENT.BUNDLE_MODULES]: {
          filters,
          search,
          entryId: moduleRow.key,
          metric: moduleMetric,
        },
      }}
      className={css.name}
    >
      {moduleRow.duplicated && (
        <Tag className={css.nameTagDuplicated} size="small" kind={Tag.KINDS.DANGER} />
      )}
      <FileName className={css.nameText} name={moduleRow.label} />
    </CustomComponentLink>
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

  moduleMetric: ModuleMetric;
  setModuleMetric: (newValue: ModuleMetric) => void;

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
    (row: ReportMetricRow) => (
      <RowHeader
        row={row}
        filters={filters}
        search={search}
        moduleMetric={moduleMetric}
        customComponentLink={CustomComponentLink}
      />
    ),
    [jobs, chunks, CustomComponentLink, filters, search, moduleMetric],
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
                handleViewAll={resetAllFilters}
                handleResetFilters={resetFilters}
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
                active={moduleMetric === ModuleMetric.TOTAL_SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleMetric.TOTAL_SIZE)}
              >
                <Tooltip title="Module total size (including duplicate modules)">
                  Module total size
                </Tooltip>
              </Button>
              <Button
                outline
                active={moduleMetric === ModuleMetric.DUPLICATE_SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleMetric.DUPLICATE_SIZE)}
              >
                <Tooltip title="Module duplicate size">Module duplicate size</Tooltip>
              </Button>
              <Button
                outline
                active={moduleMetric === ModuleMetric.SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleMetric.SIZE)}
              >
                <Tooltip title="Module size (excluding duplicate modules)">Module size</Tooltip>
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
          customComponentLink={CustomComponentLink}
          onClose={hideEntryInfo}
        />
      )}
    </>
  );
};
