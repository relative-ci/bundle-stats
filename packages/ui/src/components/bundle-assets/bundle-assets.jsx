import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, map } from 'lodash';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  FILE_TYPE_LABELS,
} from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../../ui/icon';
import { FileName } from '../../ui/file-name';
import { HoverCard } from '../../ui/hover-card';
import { Tooltip } from '../../ui/tooltip';
import { Tag } from '../../ui/tag';
import { Filters } from '../../ui/filters';
import { SortDropdown } from '../../ui/sort-dropdown';
import { EmptySet } from '../../ui/empty-set';
import { Toolbar } from '../../ui/toolbar';
import { AssetInfo } from '../asset-info';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
import { MetricsTableOptions } from '../metrics-table-options';
import { MetricsTableTitle } from '../metrics-table-title';
import css from './bundle-assets.module.css';

const RUN_TITLE_CURRENT = 'Current';
const RUN_TITLE_BASELINE = 'Baseline';
const RUNS_LABELS = [RUN_TITLE_CURRENT, RUN_TITLE_BASELINE];

const getFileTypeFilters = (filters) =>
  Object.entries(FILE_TYPE_LABELS)
    .map(([id, label]) => ({
      [id]: {
        label,
        defaultValue: get(filters, `${ASSET_FILE_TYPE}.${id}`, true),
      },
    }))
    .reduce(
      (agg, current) => ({
        ...agg,
        ...current,
      }),
      {},
    );

const getFilters = ({ compareMode, filters }) => ({
  [ASSET_FILTERS.CHANGED]: {
    label: 'Changed',
    defaultValue: filters[ASSET_FILTERS.CHANGED],
    disabled: !compareMode,
  },
  [ASSET_ENTRY_TYPE]: {
    label: 'Entry type',
    [ASSET_FILTERS.ENTRY]: {
      label: 'Entry',
      defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`, true),
    },
    [ASSET_FILTERS.INITIAL]: {
      label: 'Initial',
      defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`, true),
    },
    [ASSET_FILTERS.CHUNK]: {
      label: 'Chunk',
      defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`, true),
    },
    [ASSET_FILTERS.ASSET]: {
      label: 'Asset',
      defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ASSET}`, true),
    },
  },
  [ASSET_FILE_TYPE]: {
    label: 'File type',
    ...getFileTypeFilters(filters),
  },
});

const TooltipNotPredictive = ({ runs }) => (
  <div className={css.tooltipNotPredictive}>
    <p className={css.tooltipNotPredictiveText}>File name is the same, but the size has changed:</p>
    <table className={css.tooltipTable}>
      <tr>
        {runs.map(({ name, value }, index) => {
          const key = index;
          return (
            <tr key={key}>
              <th>{RUNS_LABELS[index]}</th>
              <td>{name}</td>
              <td>{value}</td>
            </tr>
          );
        })}
      </tr>
    </table>
  </div>
);

TooltipNotPredictive.defaultProps = {
  runs: [],
};

TooltipNotPredictive.propTypes = {
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

const RowHeader = ({ row, labels, chunks, CustomComponentLink }) => {
  const { label, isNotPredictive, runs, isChunk, isEntry, isInitial } = row;
  const [showHoverCard, setHoverCard] = useState(false);
  const handleOnMouseEnter = useCallback(() => setHoverCard(true), [showHoverCard]);

  const content = useMemo(
    () => (
      <span className={css.assetName}>
        <span className={css.assetNameTags}>
          {isNotPredictive && (
            <Tooltip className={css.notPredictive} title={<TooltipNotPredictive runs={runs} />}>
              <Icon className={css.notPredictiveIcon} glyph="warning" />
            </Tooltip>
          )}
          {isChunk && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagChunk)}
              title="Chunk"
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            />
          )}
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
        </span>
        <FileName className={css.assetNameText} name={label} />
      </span>
    ),
    [isChunk, isEntry, isInitial, isNotPredictive, runs],
  );

  if (!showHoverCard) {
    return <span onMouseEnter={handleOnMouseEnter}>{content}</span>;
  }

  return (
    <HoverCard label={content}>
      <AssetInfo
        className={css.assetInfo}
        item={row}
        labels={labels}
        chunks={chunks}
        CustomComponentLink={CustomComponentLink}
      />
    </HoverCard>
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
    updateFilters,
    resetFilters,
    resetAllFilters,
    totalRowCount,
    filters,
    hasActiveFilters,
    sortFields,
    sort,
    updateSort,
    search,
    updateSearch,
    customComponentLink: CustomComponentLink,
  } = props;

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
        labels={map(jobs, 'label')}
        chunks={jobs[0]?.meta?.webpack?.chunks || []}
        CustomComponentLink={CustomComponentLink}
      />
    ),
    [jobs, CustomComponentLink],
  );

  const emptyMessage = useMemo(() => (
    <EmptySet
      resources="assets"
      filtered={totalRowCount !== 0}
      handleResetFilters={resetFilters}
      handleViewAll={resetAllFilters}
    />
  ), [totalRowCount, resetFilters, resetAllFilters]);

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
            className={css.toolbarFilters}
            filters={dropdownFilters}
            hasActiveFilters={hasActiveFilters}
            onChange={updateFilters}
          />
        </FlexStack>
      </Toolbar>
      <main>
        <MetricsTable
          runs={jobs}
          items={items}
          renderRowHeader={renderRowHeader}
          emptyMessage={emptyMessage}
          showHeaderSum
          title={metricsTableTitle}
        />
      </main>
    </section>
  );
};

BundleAssets.defaultProps = {
  className: '',
  totalRowCount: 0,
  hasActiveFilters: false,
  customComponentLink: ComponentLink,
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
  }).isRequired,
  hasActiveFilters: PropTypes.bool,
  sortFields: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      label: PropTypes.string,
      defaultDirection: PropTypes.bool,
    }),
  }).isRequired,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  customComponentLink: PropTypes.elementType,
};
