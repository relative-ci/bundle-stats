import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { EmptySet } from '../../ui/empty-set';
import { FiltersDropdown } from '../../ui/filters-dropdown';
import { SortDropdown } from '../../ui/sort-dropdown';
import { MetricsTable } from '../metrics-table';
import { FILTER_CHANGED, FILTER_DUPLICATE } from './bundle-packages.constants';
import css from './bundle-packages.module.css';

export const BundlePackages = (props) => {
  const {
    className,
    jobs,
    items,
    updateFilters,
    resetFilters,
    totalRowCount,
    filters,
    sortItems,
    sort,
    updateSort,
  } = props;

  const emptyMessage = (
    <EmptySet
      resources="packages"
      filtered={totalRowCount !== 0}
      resetFilters={resetFilters}
    />
  );

  return (
    <section className={cx(css.root, className)}>
      <header className={css.header}>
        <SortDropdown
          className={css.dropdown}
          items={sortItems}
          {...sort}
          onChange={updateSort}
        />

        {/* @TODO: get default values from parent state */}
        <FiltersDropdown
          className={css.dropdown}
          filters={{
            [FILTER_CHANGED]: {
              label: 'Changed',
              defaultValue: filters[FILTER_CHANGED],
              disabled: jobs.length <= 1,
            },
            [FILTER_DUPLICATE]: {
              label: 'Duplicate',
              defaultValue: filters[FILTER_DUPLICATE],
            },
          }}
          label={`Filters (${items.length}/${totalRowCount})`}
          onChange={updateFilters}
        />
      </header>
      <main>
        <MetricsTable
          runs={jobs}
          items={items}
          emptyMessage={emptyMessage}
          showHeaderSum
        />
      </main>
    </section>
  );
};

BundlePackages.defaultProps = {
  className: '',
  totalRowCount: 0,
};

BundlePackages.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    runs: PropTypes.arrayOf(PropTypes.shape({
      displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
  })).isRequired,
  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
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
};
