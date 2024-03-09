import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  COMPONENT,
  FILE_TYPE_LABELS,
  SECTIONS,
} from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { MetricsDisplayType } from '../../constants';
import { useMetricsDisplayType } from '../../hooks/metrics-display-type';
import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../../ui/icon';
import { InputSearch } from '../../ui/input-search';
import { FileName } from '../../ui/file-name';
import { HoverCard } from '../../ui/hover-card';
import { Tag } from '../../ui/tag';
import { Filters } from '../../ui/filters';
import { EmptySet } from '../../ui/empty-set';
import { Toolbar } from '../../ui/toolbar';
import { AssetInfo } from '../asset-info';
import { AssetNotPredictive } from '../asset-not-predictive';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import { SEARCH_PLACEHOLDER } from './bundle-assets.i18n';
import { MetricsDisplaySelector } from '../metrics-display-selector';
import { MetricsTreemap } from '../metrics-treemap';
import css from './bundle-assets.module.css';

const RUN_TITLE_CURRENT = 'Current';
const RUN_TITLE_BASELINE = 'Baseline';
const RUNS_LABELS = [RUN_TITLE_CURRENT, RUN_TITLE_BASELINE];

const getFileTypeFilters = (filters) =>
  Object.entries(FILE_TYPE_LABELS)
    .map(([key, label]) => ({
      key,
      label,
      defaultValue: get(filters, `${ASSET_FILE_TYPE}.${key}`, true),
    }));

const getFilters = ({ compareMode, filters }) => ({
  [ASSET_FILTERS.CHANGED]: {
    label: 'Changed',
    defaultValue: filters[ASSET_FILTERS.CHANGED],
    disabled: !compareMode,
  },
  [ASSET_ENTRY_TYPE]: {
    label: 'Entry type',
    children: [
      {
        key: ASSET_FILTERS.ENTRY,
        label: 'Entry',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`, true),
      },
      {
        key: ASSET_FILTERS.INITIAL,
        label: 'Initial',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`, true),
      },
      {
        key: ASSET_FILTERS.CHUNK,
        label: 'Chunk',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`, true),
      },
      {
        key: ASSET_FILTERS.OTHER,
        label: 'Other',
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.OTHER}`, true),
      },
    ],
  },
  [ASSET_FILE_TYPE]: {
    label: 'File type',
    children: getFileTypeFilters(filters),
  },
});

const RowHeader = ({ row, customComponentLink: CustomComponentLink, filters, search }) => {
  const { label, isNotPredictive, runs, isChunk, isEntry, isInitial } = row;

  return (
    <span className={css.assetNameWrapper}>
      {isNotPredictive && (
        <HoverCard
          label={<Icon className={css.notPredictiveIcon} glyph={Icon.ICONS.WARNING} />}
          className={css.notPredictive}
          anchorClassName={css.notPredictiveAnchor}
        >
          <AssetNotPredictive runs={runs} labels={RUNS_LABELS} />
        </HoverCard>
      )}

      <CustomComponentLink
        section={SECTIONS.ASSETS}
        params={{ [COMPONENT.BUNDLE_ASSETS]: { filters, search, entryId: row.key } }}
        className={css.assetName}
      >
        <span className={css.assetNameTags}>
          {isEntry && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagEntry)}
              title="Entrypoint"
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            />
          )}
          {isInitial && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagInitial)}
              title="Initial"
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            />
          )}
          {isChunk && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagChunk)}
              title="Chunk"
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            />
          )}
        </span>
        <FileName className={css.assetNameText} name={label} />
      </CustomComponentLink>
    </span>
  );
};

RowHeader.propTypes = {
  row: PropTypes.shape({
    label: PropTypes.string,
    isNotPredictive: PropTypes.bool,
    isChunk: PropTypes.bool,
    isInitial: PropTypes.bool,
    isEntry: PropTypes.bool,
    runs: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
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

export const BundleAssets = (props) => {
  const {
    className,
    jobs,
    items,
    allItems,
    updateFilters,
    resetFilters,
    resetAllFilters,
    totalRowCount,
    filters,
    entryId,
    hasActiveFilters,
    sort,
    updateSort,
    search,
    updateSearch,
    customComponentLink: CustomComponentLink,
    hideEntryInfo,
    showEntryInfo,
  } = props;

  const jobLabels = jobs?.map((job) => job?.label);

  const [displayType, setDisplayType] = useMetricsDisplayType();

  const dropdownFilters = useMemo(
    () => getFilters({ compareMode: jobs?.length > 1, filters }),
    [jobs, filters],
  );

  const metricsTableTitle = useMemo(() => (
    <MetricsTableTitle
      title={I18N.ASSETS}
      info={`${items.length}/${totalRowCount}`}
      popoverInfo={I18N.ASSETS_INFO}
      popoverHref={config.documentation.assets}
    />
  ), [items, totalRowCount]);

  const renderRowHeader = useCallback(
    (row) => (
      <RowHeader
        row={row}
        customComponentLink={CustomComponentLink}
        filters={filters}
        search={search}
      />
    ),
    [CustomComponentLink, filters, search],
  );

  const emptyMessage = useMemo(() => (
    <EmptySet
      resources="assets"
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
              className={css.toolbarFilters}
              filters={dropdownFilters}
              hasActiveFilters={hasActiveFilters}
              onChange={updateFilters}
            />
          </FlexStack>
        </Toolbar>
        <main>
          {displayType === MetricsDisplayType.TABLE && (
            <MetricsTable
              runs={jobs}
              items={items}
              renderRowHeader={renderRowHeader}
              emptyMessage={emptyMessage}
              showHeaderSum
              title={metricsTableTitle}
              sort={sort}
              updateSort={updateSort}
            />
          )}
          {displayType === MetricsDisplayType.TREEMAP && (
            <MetricsTreemap emptyMessage={emptyMessage} items={items} onItemClick={showEntryInfo} />
          )}
        </main>
      </section>

      {entryItem && (
        <AssetInfo
          className={css.assetInfo}
          item={entryItem}
          labels={jobLabels}
          chunks={jobs[0]?.meta?.webpack?.chunks || []}
          customComponentLink={CustomComponentLink}
          onClose={hideEntryInfo}
        />
      )}
    </>
  );
};

BundleAssets.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
  entryId: '',
};

BundleAssets.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      label: PropTypes.string,
      meta: PropTypes.shape({
        webpack: PropTypes.shape({
          chunks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
        }),
      }),
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
    id: PropTypes.string,
  }).isRequired,
  entryId: PropTypes.string,
  hasActiveFilters: PropTypes.bool,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  allItems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })).isRequired,
  customComponentLink: PropTypes.elementType,
  hideEntryInfo: PropTypes.func.isRequired,
  showEntryInfo: PropTypes.func.isRequired,
};
