import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SECTIONS, COMPONENT } from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { ComponentLink } from '../component-link';
import { FlexStack } from '../../layout/flex-stack';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { Filters } from '../../ui/filters';
import { Tag } from '../../ui/tag';
import { Toolbar } from '../../ui/toolbar';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import css from './bundle-modules.module.css';
import { generateFilterFieldsData } from './bundle-modules.utils';

const RowHeader = ({ row, filters, search, customComponentLink: CustomComponentLink }) => (
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

RowHeader.propTypes = {
  row: PropTypes.shape({
    label: PropTypes.string,
    duplicated: PropTypes.bool,
  }).isRequired,
  search: PropTypes.string,
  filters: PropTypes.object,
  customComponentLink: PropTypes.elementType.isRequired,
};

RowHeader.defaultProps = {
  chunks: [],
};

export const BundleModules = ({
  className,
  jobs,
  items,
  chunks,
  totalRowCount,
  updateFilters,
  resetFilters,
  resetAllFilters,
  filters,
  entryId,
  sort,
  updateSort,
  search,
  updateSearch,
  hasActiveFilters,
  customComponentLink: CustomComponentLink,
  allItems,
  hideEntryInfo,
}) => {
  const rootClassName = cx(css.root, className);

  const jobLabels = jobs?.map((job) => job?.label);

  const filterFieldsData = useMemo(
    () => generateFilterFieldsData({ filters, chunks, compareMode: jobs.length > 1 }),
    [jobs, filters, chunks]
  );

  const metricsTableTitle = useMemo(() => (
    <MetricsTableTitle
      title={I18N.MODULES}
      info={`${items.length}/${totalRowCount}`}
      popoverInfo={I18N.MODULES_INFO}
      popoverHref={config.documentation.modules}
    />
  ), [items, totalRowCount]);

  const renderRowHeader = useCallback(
    (row) => (
      <RowHeader
        row={row}
        filters={filters}
        search={search}
        customComponentLink={CustomComponentLink}
      />
    ),
    [jobs, chunks, CustomComponentLink, filters, search],
  );

  const emptyMessage = useMemo(() => (
    <EmptySet
      resources="modules"
      filtered={totalRowCount !== 0}
      handleResetFilters={resetFilters}
      handleViewAll={resetAllFilters}
    />
  ), [totalRowCount, resetFilters, resetAllFilters]);

  const entryItem = useMemo(() => {
    if (!entryId) {
      return null;
    }

    return allItems.find(({ key }) => key === entryId)
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
            <MetricsTableSearch
              className={css.toolbarSearch}
              search={search}
              updateSearch={updateSearch}
              placeholder="Search by name"
            />
            <Filters
              className={css.tableDropdown}
              filters={filterFieldsData}
              onChange={updateFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </FlexStack>
        </Toolbar>

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

BundleModules.defaultProps = {
  className: '',
  items: [],
  jobs: [],
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
};

BundleModules.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rows data */
  items: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Jobs data */
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Chunks data */
  chunks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,

  /** total row count */
  totalRowCount: PropTypes.number,

  /** Update filters handler */
  updateFilters: PropTypes.func.isRequired,

  /** Reset filters handler */
  resetFilters: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,

  /** Filters data */
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,

  hasActiveFilters: PropTypes.bool,

  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  customComponentLink: PropTypes.elementType,
  hideEntryInfo: PropTypes.func.isRequired,
};
