import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, isEmpty, map } from 'lodash';
import {
  FILE_TYPE_LABELS,
  MODULE_SOURCE_FILE_TYPES,
  MODULE_CHUNK,
  MODULE_FILTERS,
  MODULE_FILE_TYPE,
} from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { ComponentLink } from '../component-link';
import { FlexStack } from '../../layout/flex-stack';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { Filters } from '../../ui/filters';
import { Popover } from '../../ui/popover';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Toolbar } from '../../ui/toolbar';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { ModuleInfo } from '../module-info';
import css from './bundle-modules.module.css';

const RowHeader = ({ row, chunks, labels, CustomComponentLink }) => {
  const chunkIds = map(chunks, 'id');

  const [showPopopver, setPopover] = useState(false);
  const handleOnMouseEnter = useCallback(() => setPopover(true), [showPopopver]);
  const content = <FileName name={row.label} />;

  return (
    <div onMouseEnter={handleOnMouseEnter}>
      {!showPopopver ?
        content
        : (
        <Popover ariaLabel="View module info" label={content}>
          {({ popoverToggle }) => (
            <ModuleInfo
              className={css.namePopover}
              item={row}
              chunks={chunks}
              chunkIds={chunkIds}
              labels={labels}
              customComponentLink={CustomComponentLink}
              onClick={popoverToggle}
            />
          )}
        </Popover>
      )}
    </div>
  );
};

RowHeader.propTypes = {
  row: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
  chunks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  CustomComponentLink: PropTypes.elementType.isRequired,
};

RowHeader.defaultProps = {
  chunks: [],
};

const getRenderRowHeader = ({ labels, chunks, CustomComponentLink }) => (row) => (
  <RowHeader row={row} chunks={chunks} labels={labels} CustomComponentLink={CustomComponentLink} />
);

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
  sortItems,
  sort,
  updateSort,
  search,
  updateSearch,
  hasActiveFilters,
  customComponentLink: CustomComponentLink,
}) => {
  const rootClassName = cx(css.root, className);

  const labels = useMemo(() => map(jobs, 'label'), [jobs]);
  const renderRowHeader = useMemo(
    () => getRenderRowHeader({ labels, chunks, CustomComponentLink }),
    [labels, chunks],
  );
  const emptyMessage = (
    <EmptySet
      resources="modules"
      filtered={totalRowCount !== 0}
      handleResetFilters={resetFilters}
      handleViewAll={resetAllFilters}
    />
  );

  const dropdownFilters = {
    [MODULE_FILTERS.CHANGED]: {
      label: 'Changed',
      defaultValue: filters.changed,
      disabled: jobs.length <= 1,
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
  };

  return (
    <div className={rootClassName}>
      <Toolbar
        className={css.toolbar}
        renderActions={({ actionClassName }) => (
          <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
            <SortDropdown
              className={css.tableDropdown}
              items={sortItems}
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
        <FlexStack>
          <MetricsTableSearch
            className={css.toolbarSearch}
            search={search}
            updateSearch={updateSearch}
            placeholder="Search by name"
          />
          <Filters
            className={css.tableDropdown}
            filters={dropdownFilters}
            label={`Filters (${items.length}/${totalRowCount})`}
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
        title={
          <MetricsTableTitle
            title={I18N.MODULES}
            info={`(${items.length}/${totalRowCount})`}
            popoverInfo={I18N.MODULES_INFO}
            popoverHref={config.documentation.modules}
          />
        }
      />
    </div>
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
  chunks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,

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

  sortItems: PropTypes.shape({
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
};
