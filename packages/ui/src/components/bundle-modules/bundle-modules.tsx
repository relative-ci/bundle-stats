import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';
import { SECTIONS, COMPONENT } from '@bundle-stats/utils';

import type { SortAction } from '../../types';
import config from '../../config.json';
import I18N from '../../i18n';
import { ComponentLink } from '../component-link';
import { FlexStack } from '../../layout/flex-stack';
import { InputSearch } from '../../ui/input-search';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { Filters } from '../../ui/filters';
import { Tag } from '../../ui/tag';
import { Toolbar } from '../../ui/toolbar';
import { MetricsTable } from '../metrics-table';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import { generateFilterFieldsData } from './bundle-modules.utils';
import { ModuleMetric } from './bundle-modules.constants';
import type { Chunk, Job, ReportMetricModuleRow } from './bundle-modules.types';
import * as I18N_MODULES from './bundle-modules.i18n';
import css from './bundle-modules.module.css';
import { Box } from '../../layout';
import { Button } from '../../ui';
import { Tooltip } from '../../ui/tooltip';

interface RowHeaderProps {
  row: ReportMetricModuleRow;
  filters?: any;
  search?: string;
  customComponentLink: React.ElementType;
}

const RowHeader = (props: RowHeaderProps) => {
  const { row, filters, search, customComponentLink: CustomComponentLink } = props;

  return (
    <CustomComponentLink
      section={SECTIONS.MODULES}
      params={{ [COMPONENT.BUNDLE_MODULES]: { filters, search, entryId: row.key } }}
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
    customComponentLink: CustomComponentLink = ComponentLink,
  } = props;

  const rootClassName = cx(css.root, className);
  const jobLabels = jobs?.map((job) => job?.label);

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
        customComponentLink={CustomComponentLink}
      />
    ),
    [jobs, chunks, CustomComponentLink, filters, search],
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
      <div className={rootClassName}>
        <Toolbar
          className={css.toolbar}
          renderActions={({ actionClassName }) => (
            <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
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
        <Box padding={['xsmall', 'small']} className={css.metricSelector}>
          <FlexStack space="xxsmall" as="nav">
            <Button
              outline
              kind={moduleMetric === ModuleMetric.SIZE ? 'primary' : 'default'}
              size="small"
              type="button"
              onClick={() => setModuleMetric(ModuleMetric.SIZE)}
            >
              <Tooltip title="Size (excluding duplicate modules)">Module size</Tooltip>
            </Button>
            <Button
              outline
              kind={moduleMetric === ModuleMetric.TOTAL_SIZE ? 'primary' : 'default'}
              size="small"
              type="button"
              onClick={() => setModuleMetric(ModuleMetric.TOTAL_SIZE)}
            >
              <Tooltip title="Size (including duplicate modules)">Module total size</Tooltip>
            </Button>
          </FlexStack>
        </Box>
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
      </div>
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
