import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { COMPONENT, PACKAGE_FILTERS, PACKAGES_SEPARATOR, SECTIONS } from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { InputSearch } from '../../ui/input-search';
import { EmptySet } from '../../ui/empty-set';
import { Filters } from '../../ui/filters';
import { Tag } from '../../ui/tag';
import { Table } from '../../ui/table';
import { Toolbar } from '../../ui/toolbar';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { PackageInfo } from '../package-info';
import { SEARCH_PLACEHOLDER } from './bundle-packages.i18n';
import css from './bundle-packages.module.css';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsDisplayType } from '../../constants';
import { MetricsTreemap } from '../metrics-treemap';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';

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

const PackageName = ({ packageName, showDetails, row, filters, search, CustomComponentLink }) => {
  const params = useMemo(() => ({
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters,
      search,
      entryId: showDetails ? row.key : packageName
    }
  }), [filters, search, row, packageName]);

  return (
    <CustomComponentLink section={SECTIONS.PACKAGES} params={params} className={css.packageName}>
      {showDetails && row.duplicate && (
        <Tag
          className={css.packageNameTagDuplicate}
          title="Duplicate package"
          kind={Tag.KINDS.DANGER}
          size={Tag.SIZES.SMALL}
        />
      )}
      <span className={css.packageNameLabel}>{packageName}</span>
    </CustomComponentLink>
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
  filters: PropTypes.object, // eslint-disable-line react/forbid-props
  search: PropTypes.string,
};

const RowHeader = ({ row, labels, CustomComponentLink, filters, search }) => {
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
          filters={filters}
          search={search}
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
  filters: PropTypes.object, // eslint-disable-line react/forbid-props
  search: PropTypes.string,
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
    sort,
    updateSort,
    search,
    updateSearch,
    hasActiveFilters,
    customComponentLink: CustomComponentLink,
    entryId,
    allItems,
    hideEntryInfo,
    showEntryInfo,
  } = props;

  const jobLabels = jobs?.map((job) => job?.label);

  const [displayType, setDisplayType] = useMetricsDisplayType();

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
        labels={jobLabels}
        CustomComponentLink={CustomComponentLink}
        filters={filters}
        search={search}
      />
    ),
    [CustomComponentLink, jobLabels, filters, search],
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

  const entryItem = useMemo(() => {
    if (!entryId) {
      return null;
    }

    return allItems.find(({ key }) => key === entryId)
  }, [allItems, entryId]);

  return (
    <>
      <section className={cx(css.root, className)}>
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
              placeholder={SEARCH_PLACEHOLDER}
              defaultValue={search}
              onChange={updateSearch}
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
          {displayType === MetricsDisplayType.TABLE && (
            <MetricsTable
              runs={jobs}
              items={items}
              emptyMessage={emptyMessage}
              renderRowHeader={renderRowHeader}
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
              <MetricsTreemap emptyMessage={emptyMessage} items={items} onItemClick={showEntryInfo} />
            </>
          )}
        </main>
      </section>
      {entryItem && (
        <PackageInfo
          className={css.packageInfo}
          item={entryItem}
          labels={jobLabels}
          customComponentLink={CustomComponentLink}
          onClose={hideEntryInfo}
        />
      )}
    </>
  );
};

BundlePackages.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
  entryId: '',
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
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  allItems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })).isRequired,
  customComponentLink: PropTypes.elementType,
  entryId: PropTypes.string,
  hideEntryInfo: PropTypes.func.isRequired,
  showEntryInfo: PropTypes.func.isRequired,
};
