import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
  FILE_TYPE_LABELS,
  MODULE_SOURCE_FILE_TYPES,
  MODULE_SOURCE_TYPE,
  MODULE_CHUNK,
  MODULE_FILTERS,
  MODULE_FILE_TYPE,
  SECTIONS,
  COMPONENT,
} from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { ComponentLink } from '../component-link';
import { FlexStack } from '../../layout/flex-stack';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { Filters } from '../../ui/filters';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Tag } from '../../ui/tag';
import { Toolbar } from '../../ui/toolbar';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import css from './bundle-modules.module.css';

const getFilters = ({ filters, compareMode, chunks }) => ({
    [MODULE_FILTERS.CHANGED]: {
      label: 'Changed',
      defaultValue: filters.changed,
      disabled: !compareMode,
    },
    [MODULE_FILTERS.DUPLICATED]: {
      label: 'Duplicate',
      defaultValue: filters[MODULE_FILTERS.DUPLICATED],
    },

    // When chunks data available, list available chunks as filters
    ...(!isEmpty(chunks) && {
      [MODULE_CHUNK]: {
        label: 'Chunk',
        ...chunks.reduce(
          (chunkFilters, { id, name }) => ({
            ...chunkFilters,
            [id]: {
              label: name,
              defaultValue: get(filters, `${MODULE_CHUNK}.${id}`, true),
            },
          }),
          {},
        ),
      },
    }),

    [MODULE_SOURCE_TYPE]: {
      label: 'Source',
      [MODULE_FILTERS.FIRST_PARTY]: {
        label: 'First party',
        defaultValue: get(filters, `${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`, true),
      },
      [MODULE_FILTERS.THIRD_PARTY]: {
        label: 'Third party',
        defaultValue: get(filters, `${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`, true),
      },
    },

    // Module source types
    [MODULE_FILE_TYPE]: {
      label: 'File type',
      ...MODULE_SOURCE_FILE_TYPES.reduce(
        (agg, fileType) => ({
          ...agg,
          [fileType]: {
            label: FILE_TYPE_LABELS[fileType],
            defaultValue: get(filters, `${MODULE_FILE_TYPE}.${fileType}`, true),
          },
        }),
        {},
      ),
    },
})

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
  sortFields,
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

  const dropdownFilters = useMemo(
    () => getFilters({ filters, chunks, compareMode: jobs.length > 1 }),
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

  return (
    <>
      <div className={rootClassName}>
        <Toolbar
          className={css.toolbar}
          renderActions={({ actionClassName }) => (
            <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
              <SortDropdown
                className={css.tableDropdown}
                fields={sortFields}
                onChange={updateSort}
                {...sort}
              />
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
              filters={dropdownFilters}
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
        />
      </div>
      {entryId && (
        <ModuleInfo
          className={css.moduleInfo}
          item={allItems.find(({ key }) => key === entryId)}
          chunks={chunks}
          chunkIds={chunks?.map(({ id }) => id)}
          labels={jobs.map(({ label }) => label)}
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

  sortFields: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      label: PropTypes.string,
      defaultDirection: PropTypes.bool,
    }),
  }).isRequired,
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
