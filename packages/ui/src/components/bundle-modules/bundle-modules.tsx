import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';
import { SECTIONS, COMPONENT } from '@bundle-stats/utils';

import { SortAction } from '../../types';
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
import { MetricsTreemap, getTreemapNodes } from '../metrics-treemap';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import { generateFilterFieldsData } from './bundle-modules.utils';
import { ModuleMetric } from './bundle-modules.constants';
import type { Chunk, Job, ReportMetricModuleRow } from './bundle-modules.types';
import * as I18N_MODULES from './bundle-modules.i18n';
import css from './bundle-modules.module.css';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';

interface RowHeaderProps {
  row: ReportMetricModuleRow;
  filters?: any;
  search?: string;
  moduleMetric?: string;
  customComponentLink: React.ElementType;
}

const RowHeader = (props: RowHeaderProps) => {
  const { row, filters, search, moduleMetric, customComponentLink: CustomComponentLink } = props;

  return (
    <CustomComponentLink
      section={SECTIONS.MODULES}
      params={{
        [COMPONENT.BUNDLE_MODULES]: { filters, search, entryId: row.key, metric: moduleMetric },
      }}
      className={css.name}
    >
      {row.duplicated && (
        <Tag className={css.nameTagDuplicated} size="small" kind={Tag.KINDS.DANGER} />
      )}
      <FileName className={css.nameText} name={row.label} />
    </CustomComponentLink>
  );
};

interface BundleModulesProps extends React.ComponentProps<'div'> {
  jobs?: Array<Job>;
  items?: Array<ReportMetricModuleRow>;
  allItems?: Array<ReportMetricModuleRow>;
  chunks?: Array<Chunk>;

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

  const [displayType, setDisplayType] = useMetricsDisplayType();

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
    (row: ReportMetricModuleRow) => (
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
              <MetricsDisplaySelector onSelect={setDisplayType} value={displayType} />
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
                active={moduleMetric === ModuleMetric.SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleMetric.SIZE)}
              >
                <Tooltip title="Size (excluding duplicate modules)">Module size</Tooltip>
              </Button>
              <Button
                outline
                active={moduleMetric === ModuleMetric.TOTAL_SIZE}
                size="small"
                type="button"
                onClick={() => setModuleMetric(ModuleMetric.TOTAL_SIZE)}
              >
                <Tooltip title="Size (including duplicate modules)">Module total size</Tooltip>
              </Button>
            </ControlGroup>
          </Box>
          {displayType === MetricsDisplayType.TABLE && (
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
          {displayType === MetricsDisplayType.TREEMAP && (
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
                treeNodes={getTreemapNodes(items)}
                emptyMessage={emptyMessage}
                onItemClick={showEntryInfo}
              />
            </>
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
