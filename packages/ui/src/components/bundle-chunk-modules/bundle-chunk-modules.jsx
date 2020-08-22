import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { map } from 'lodash';

import { Box } from '../../layout/box';
import { EmptySet } from '../../ui/empty-set';
import { FileName } from '../../ui/file-name';
import { FiltersDropdown } from '../../ui/filters-dropdown';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Toolbar } from '../../ui/toolbar';
import { Tooltip } from '../../ui/tooltip';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import css from './bundle-chunk-modules.module.css';

const getRenderRowHeader = (labels) => (row) => (
  <Tooltip
    title={
      <div className={css.nameTooltip}>
        {row.runs.map((run, index) => {
          const key = index;

          return (
            <div className={css.nameTooltipItem} key={key}>
              <h5 className={css.nameTooltipTitle}>{labels[index]}</h5>
              <FileName className={css.nameTooltipText} name={run && run.name ? run.name : '-'} />
            </div>
          );
        })}
      </div>
    }
    align="topLeft"
  >
    <FileName className={css.name} name={row.label} />
  </Tooltip>
);

export const BundleChunkModules = ({
  className,
  name,
  id,
  runs,
  items,
  totalRowCount,
  updateFilters,
  resetFilters,
  filters,
  sortItems,
  sort,
  updateSort,
  search,
  updateSearch,
}) => {
  const rootClassName = cx(css.root, className);

  const clearSearch = () => {
    resetFilters();
    updateSearch('');
  };

  const renderRowHeader = useMemo(() => getRenderRowHeader(map(runs, 'label')), []);
  const emptyMessage = useMemo(
    () => (
      <EmptySet resources="modules" filtered={totalRowCount !== 0} resetFilters={clearSearch} />
    ),
    [],
  );

  return (
    <div className={rootClassName}>
      <header className={css.header}>
        <h3 className={css.headerTitle}>
          {name && <span className={css.headerTitleName}>{name}</span>}
          {id && <span className={css.headerTitleId}>{`Chunk id: ${id}`}</span>}
        </h3>
      </header>
      <Box outline>
        <Toolbar
          className={css.toolbar}
          renderActions={({ actionClassName }) => (
            <>
              <div className={actionClassName}>
                <SortDropdown
                  className={css.tableDropdown}
                  items={sortItems}
                  onChange={updateSort}
                  {...sort}
                />
              </div>
              <div className={actionClassName}>
                <FiltersDropdown
                  className={css.tableDropdown}
                  filters={{
                    changed: {
                      label: 'Changed',
                      defaultValue: filters.changed,
                      disabled: runs.length <= 1,
                    },
                  }}
                  label={`Filters (${items.length}/${totalRowCount})`}
                  onChange={updateFilters}
                />
              </div>
            </>
          )}
        >
          <MetricsTableSearch
            className={css.toolbarSearch}
            search={search}
            updateSearch={updateSearch}
            placeholder="Search by name"
          />
        </Toolbar>
        <MetricsTable
          className={css.table}
          items={items}
          runs={runs}
          renderRowHeader={renderRowHeader.current}
          emptyMessage={emptyMessage}
          showHeaderSum
        />
      </Box>
    </div>
  );
};

BundleChunkModules.defaultProps = {
  className: '',
  name: '',
  id: '',
  items: [],
  runs: [],
  totalRowCount: 0,
};

BundleChunkModules.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Chunk name */
  name: PropTypes.string,

  /** Chunk id */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** Rows data */
  items: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Runs data */
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** total row count */
  totalRowCount: PropTypes.number,

  /** Update filters handler */
  updateFilters: PropTypes.func.isRequired,

  /** Reset filters handler */
  resetFilters: PropTypes.func.isRequired,

  /** Filters data */
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,

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
};
