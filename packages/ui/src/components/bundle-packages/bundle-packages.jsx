import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { PACKAGE_FILTERS, PACKAGES_SEPARATOR } from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { EmptySet } from '../../ui/empty-set';
import { Filters } from '../../ui/filters';
import { HoverCard } from '../../ui/hover-card';
import { SortDropdown } from '../../ui/sort-dropdown';
import { Tag } from '../../ui/tag';
import { Toolbar } from '../../ui/toolbar';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { PackageInfo } from '../package-info';
import css from './bundle-packages.module.css';

const getDropdownFilters = ({ compareMode, filters }) => ({
  [PACKAGE_FILTERS.CHANGED]: {
    label: 'Changed',
    defaultValue: filters[PACKAGE_FILTERS.CHANGED],
    disabled: !compareMode,
  },
  [PACKAGE_FILTERS.DUPLICATE]: {
    label: 'Duplicate',
    defaultValue: filters[PACKAGE_FILTERS.DUPLICATE],
  },
});

const PackageName = ({ packageName, showDetails, row, labels, CustomComponentLink }) => {
  const [showHoverCard, setHoverCard] = useState(false);

  const handleOnMouseEnter = useCallback(() => {
    if (showDetails) {
      setHoverCard(true);
    }
  }, [setHoverCard, showDetails]);

  const label = useMemo(
    () => (
      <>
        {showDetails && row.duplicate && (
          <Tag
            className={css.packageNameTagDuplicate}
            title="Duplicate package"
            kind={Tag.KINDS.DANGER}
            size={Tag.SIZES.SMALL}
          />
        )}
        <span className={css.packageNameLabel}>{packageName}</span>
      </>
    ),
    [packageName, showDetails, row],
  );

  if (!showHoverCard) {
    return (
      <span className={css.packageName} onMouseEnter={handleOnMouseEnter}>
        {label}
      </span>
    );
  }

  return (
    <HoverCard label={label} className={css.packageName} hoverCardClassName={css.hoverCard}>
      {({ close }) => (
        <PackageInfo
          name={packageName}
          item={row}
          labels={labels}
          customComponentLink={CustomComponentLink}
          onClick={close}
        />
      )}
    </HoverCard>
  );
};

PackageName.propTypes = {
  packageName: PropTypes.string.isRequired,
  showDetails: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    label: PropTypes.string,
    duplicate: PropTypes.bool,
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  CustomComponentLink: PropTypes.elementType.isRequired,
};

const RowHeader = ({ row, labels, CustomComponentLink }) => {
  const packageNames = row.label.split(PACKAGES_SEPARATOR);

  return (
    <span className={css.packageNames}>
      {packageNames.map((packageName, index) => (
        <PackageName
          packageName={packageName}
          row={row}
          labels={labels}
          showDetails={index === packageNames.length - 1}
          CustomComponentLink={CustomComponentLink}
        />
      ))}
    </span>
  );
};

RowHeader.propTypes = {
  row: PropTypes.shape({
    label: PropTypes.string,
    duplicate: PropTypes.bool,
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  CustomComponentLink: PropTypes.elementType.isRequired,
};

export const BundlePackages = (props) => {
  const {
    className,
    jobs,
    items,
    updateFilters,
    resetFilters,
    resetAllFilters,
    totalRowCount,
    filters,
    sortFields,
    sort,
    updateSort,
    search,
    updateSearch,
    hasActiveFilters,
    customComponentLink: CustomComponentLink,
  } = props;

  const dropdownFilters = useMemo(
    () => getDropdownFilters({ compareMode: jobs?.length > 1, filters }),
    [jobs, filters],
  );

  const metricsTableTitle = useMemo(
    () => (
      <MetricsTableTitle
        title={I18N.PACKAGES}
        info={`${items.length}/${totalRowCount}`}
        popoverInfo={I18N.PACKAGES_INFO}
        popoverHref={config.documentation.packages}
      />
    ),
    [items, totalRowCount],
  );

  const renderRowHeader = useCallback(
    (row) => (
      <RowHeader
        row={row}
        labels={jobs.map((job) => job?.label)}
        CustomComponentLink={CustomComponentLink}
      />
    ),
    [CustomComponentLink, jobs],
  );

  const emptyMessage = useMemo(
    () => (
      <EmptySet
        resources="packages"
        filtered={totalRowCount !== 0}
        handleResetFilters={resetFilters}
        handleViewAll={resetAllFilters}
      />
    ),
    [totalRowCount, resetFilters, resetAllFilters],
  );

  return (
    <section className={cx(css.root, className)}>
      <Toolbar
        className={css.toolbar}
        renderActions={({ actionClassName }) => (
          <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
            <SortDropdown fields={sortFields} {...sort} onChange={updateSort} />
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
            placeholder="Search by name"
            search={search}
            updateSearch={updateSearch}
          />
          <Filters
            filters={dropdownFilters}
            label={`Filters (${items.length}/${totalRowCount})`}
            onChange={updateFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </FlexStack>
      </Toolbar>
      <main>
        <MetricsTable
          runs={jobs}
          items={items}
          emptyMessage={emptyMessage}
          renderRowHeader={renderRowHeader}
          showHeaderSum
          title={metricsTableTitle}
        />
      </main>
    </section>
  );
};

BundlePackages.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
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
  resetAllFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
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
};
