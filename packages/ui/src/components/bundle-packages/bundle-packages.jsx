import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import escapeRegExp from 'lodash/escapeRegExp';
import { COMPONENT, PACKAGE_FILTERS, PACKAGES_SEPARATOR, SECTIONS } from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Dialog, useDialogState } from '../../ui/dialog';
import { InputSearch } from '../../ui/input-search';
import { EmptySet } from '../../ui/empty-set';
import { Filters } from '../../ui/filters';
import { Tag } from '../../ui/tag';
import { Table } from '../../ui/table';
import { Toolbar } from '../../ui/toolbar';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableExport } from '../metrics-table-export';
import { MetricsTableHeader } from '../metrics-table-header';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { PackageInfo } from '../package-info';
import { SEARCH_PLACEHOLDER } from './bundle-packages.i18n';
import css from './bundle-packages.module.css';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsDisplayType } from '../../constants';
import { MetricsTreemap, getTreemapNodes, getTreemapNodesGroupedByPath } from '../metrics-treemap';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';

const DISPLAY_TYPE_GROUPS = {
  [MetricsDisplayType.TREEMAP]: ['folder'],
};

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

const ViewMetricsTreemap = (props) => {
  const { metricsTableTitle, jobs, items, displayType, emptyMessage, showEntryInfo, updateSearch, search } = props;

  // Get treenodes based on group
  const treeNodes = useMemo(() => {
    if (displayType.groupBy === 'folder') {
      return getTreemapNodesGroupedByPath(items);
    }

    return getTreemapNodes(items);
  }, [items, displayType.groupBy]);

  // Search based on the group path on group title click
  const onGroupClick = useCallback(
    (groupPath) => {
      // Clear seach when groupPath is emty (root)
      if (groupPath === '') {
        updateSearch('');
        return;
      }
      // Search by group path
      // 1. use `^` to match only the string beggining
      // 2. add `/` suffix to exactly match the directory
      const newSearch = `^${escapeRegExp(groupPath)}/`;

      // Reset search when toggling the same groupPath
      if (newSearch === search) {
        updateSearch('');
        return;
      }

      updateSearch(newSearch);
    },
    [updateSearch, search],
  );

  return (
    <>
      <Table compact>
        <MetricsTableHeader metricTitle={metricsTableTitle} showSum jobs={jobs} rows={items} />
      </Table>
      <MetricsTreemap
        treeNodes={treeNodes}
        nested={Boolean(displayType.groupBy)}
        emptyMessage={emptyMessage}
        onItemClick={showEntryInfo}
        onGroupClick={onGroupClick}
      />
    </>
  );
};

ViewMetricsTreemap.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  metricsTableTitle: PropTypes.node.isRequired,
  displayType: PropTypes.shape({
    groupBy: PropTypes.string,
  }).isRequired,
  emptyMessage: PropTypes.node.isRequired,
  showEntryInfo: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
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

  const [displayType, setDisplayType] = useMetricsDisplayType(DISPLAY_TYPE_GROUPS);

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

  const exportDialog = useDialogState();
  const [exportSourceType, setExportSourceType] = useState(undefined);

  const handleExportClick = useCallback((sourceType) => {
    setExportSourceType(sourceType);
    exportDialog.toggle();
  }, []);

  return (
    <>
      <Stack space="xsmall" as="section" className={cx(css.root, className)}>
        <Toolbar
          className={css.toolbar}
          renderActions={({ actionClassName }) => (
            <FlexStack space="xxsmall" className={cx(css.dropdown, actionClassName)}>
              <MetricsDisplaySelector onSelect={setDisplayType} value={displayType.value} groupBy={displayType.groupBy} groups={DISPLAY_TYPE_GROUPS} />
              <MetricsTableOptions
                onViewAllClick={resetAllFilters}
                onResetClick={resetFilters}
                onExportClick={handleExportClick}
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
        <Box outline as="main">
          {displayType.value === MetricsDisplayType.TABLE && (
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
          {displayType.value === MetricsDisplayType.TREEMAP && (
            <ViewMetricsTreemap
              jobs={jobs}
              items={items}
              metricsTableTitle={metricsTableTitle}
              displayType={displayType}
              emptyMessage={emptyMessage}
              showEntryInfo={showEntryInfo}
              updateSearch={updateSearch}
              search={search}
            />
          )}
        </Box>
      </Stack>
      {entryItem && (
        <PackageInfo
          className={css.packageInfo}
          item={entryItem}
          labels={jobLabels}
          customComponentLink={CustomComponentLink}
          onClose={hideEntryInfo}
        />
      )}

      <Dialog title={I18N.EXPORT} width="wide" state={exportDialog}>
        {exportDialog.open && (
          <MetricsTableExport
            items={items}
            initialSourceType={exportSourceType}
            download="bundle-stats--packages"
          />
        )}
      </Dialog>
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
