import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { PACKAGES_SEPARATOR } from '@bundle-stats/utils';

import { PACKAGE_FILTERS } from '../../constants';
import { EmptySet } from '../../ui/empty-set';
import { FiltersDropdown } from '../../ui/filters-dropdown';
import { Popover } from '../../ui/popover';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Toolbar } from '../../ui/toolbar';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import css from './bundle-packages.module.css';

const getPopoverContent = (packageName) => (
  <div className={css.packagePopover}>
    <h4 className={css.packagePopoverTitle}>{packageName}</h4>
    <ul className={css.packagePopoverList}>
      <li className={css.packagePopoverItem}>
        <a href={`https://www.npmjs.com/package/${packageName}`} target="_blank" rel="noreferrer">npmjs.com</a>
      </li>
      <li className={css.packagePopoverItem}>
        <a
          href={`https://bundlephobia.com/result?p=${packageName}`}
          target="_blank"
          rel="noreferrer"
        >
          bundlephobia.com
        </a>
      </li>
    </ul>
  </div>
);

const renderRowHeader = (item) => {
  const packages = item.label.split(PACKAGES_SEPARATOR);

  return (
    <>
      {packages.map((packageName, index) => {
        if (index < packages.length - 1) {
          return <span className={css.packageName}>{packageName}</span>;
        }

        return (
          <Popover className={css.packageName} content={getPopoverContent(packageName)}>
            {item.duplicate && <span className={css.duplicate} title="Duplicate package">D</span>}
            {packageName}
          </Popover>
        );
      })}
    </>
  );
}

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
    search,
    updateSearch,
    hasActiveFilters,
  } = props;

  const clear = () => {
    resetFilters();
    updateSearch('');
  };

  const emptyMessage = useMemo(
    () => <EmptySet resources="packages" filtered={totalRowCount !== 0} resetFilters={clear} />,
    [],
  );

  return (
    <section className={cx(css.root, className)}>
      <Toolbar
        className={css.toolbar}
        renderActions={({ actionClassName }) => (
          <>
            <div className={actionClassName}>
              <SortDropdown items={sortItems} {...sort} onChange={updateSort} />
            </div>
            <div className={actionClassName}>
              {/* @TODO: get default values from parent state */}
              <FiltersDropdown
                filters={{
                  [PACKAGE_FILTERS.CHANGED]: {
                    label: 'Changed',
                    defaultValue: filters[PACKAGE_FILTERS.CHANGED],
                    disabled: jobs.length <= 1,
                  },
                  [PACKAGE_FILTERS.DUPLICATE]: {
                    label: 'Duplicate',
                    defaultValue: filters[PACKAGE_FILTERS.DUPLICATE],
                  },
                }}
                label={`Filters (${items.length}/${totalRowCount})`}
                onChange={updateFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </>
        )}
      >
        <MetricsTableSearch
          className={css.toolbarSearch}
          placeholder="Search by name"
          search={search}
          updateSearch={updateSearch}
        />
      </Toolbar>
      <main>
        <MetricsTable
          runs={jobs}
          items={items}
          emptyMessage={emptyMessage}
          renderRowHeader={renderRowHeader}
          showHeaderSum
        />
      </main>
    </section>
  );
};

BundlePackages.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
};

BundlePackages.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
    }),
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      runs: PropTypes.arrayOf(
        PropTypes.shape({
          displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
      ),
    }),
  ).isRequired,
  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
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
};
