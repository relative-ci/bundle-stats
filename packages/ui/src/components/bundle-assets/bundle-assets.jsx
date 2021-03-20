import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, map } from 'lodash';
import { ASSET_ENTRY_TYPE, ASSET_FILE_TYPE, ASSET_FILTERS, FILE_TYPE_LABELS } from '@bundle-stats/utils';

import config from '../../config.json';
import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { Popover } from '../../ui/popover';
import { Tooltip } from '../../ui/tooltip';
import { Filters } from '../../ui/filters';
import { SortDropdown } from '../../ui/sort-dropdown';
import { EmptySet } from '../../ui/empty-set';
import { Toolbar } from '../../ui/toolbar';
import { AssetInfo } from '../asset-info';
import { ComponentLink } from '../component-link';
import { MetricsTable } from '../metrics-table';
import { MetricsTableSearch } from '../metrics-table-search';
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

const getRenderRowHeader = ({ labels, CustomComponentLink, chunks }) => (item) => (
  <Popover
    label={<FileName name={item.label} />}
    icon={
      <FlexStack space="xxxsmall" className={css.assetInfoFlags}>
        {item.isChunk && (
          <span title="Chunk" className={css.flagChunk}>
            c
          </span>
        )}
        {item.isEntry && (
          <span title="Entrypoint" className={css.flagEntry}>
            e
          </span>
        )}
        {item.isInitial && (
          <span title="Initial" className={css.flagInitial}>
            i
          </span>
        )}
        {item.isNotPredictive && (
          <Tooltip className={css.notPredictive} title={<TooltipNotPredictive runs={item.runs} />}>
            <span className={cx('ui-icon ui-icon--small', css.notPredictiveIcon)}>warning</span>
          </Tooltip>
        )}
      </FlexStack>
    }
  >
    <AssetInfo
      className={css.assetInfo}
      item={item}
      labels={labels}
      chunks={chunks}
      CustomComponentLink={CustomComponentLink}
    />
  </Popover>
);

const Title = () => {
  return (
    <FlexStack space="xxxsmall" className={css.title}>
      <span>{I18N.ASSETS}</span>
      <Popover icon="help">
        <Stack space="xxxsmall">
          <p>{I18N.ASSETS_INFO}</p>
          <p>
            <a href={config.documentation.assets} target="_blank" rel="noreferrer">
              {I18N.READ_MORE}
            </a>
          </p>
        </Stack>
      </Popover>
    </FlexStack>
  );
};

export const BundleAssets = (props) => {
  const {
    className,
    jobs,
    items,
    updateFilters,
    resetFilters,
    totalRowCount,
    filters,
    hasActiveFilters,
    sortItems,
    sort,
    updateSort,
    search,
    updateSearch,
    customComponentLink: CustomComponentLink,
  } = props;

  const clearSearch = () => {
    resetFilters();
    updateSearch('');
  };

  const emptyMessage = useMemo(
    () => <EmptySet resources="assets" filtered={totalRowCount !== 0} resetFilters={clearSearch} />,
    [],
  );

  const chunks = jobs[0]?.meta?.webpack?.chunks || [];

  const renderRowHeader = useMemo(
    () =>
      getRenderRowHeader({
        labels: map(jobs, 'label'),
        CustomComponentLink,
        chunks,
      }),
    [jobs, chunks],
  );

  return (
    <section className={cx(css.root, className)}>
      <Toolbar
        className={css.toolbar}
        renderActions={({ actionClassName }) => (
          <>

            <div className={cx(css.dropdown, actionClassName)}>
              {/* @TODO: get default values from parent state */}
            </div>
          </>
        )}
      >
        <Stack space="xsmall">
          <FlexStack space="xsmall">
            <MetricsTableSearch
              className={css.toolbarSearch}
              placeholder="Search by name"
              search={search}
              updateSearch={updateSearch}
            />
            <div>
              <SortDropdown items={sortItems} {...sort} onChange={updateSort} />
            </div>
          </FlexStack>
          <div>
            <Filters
              filters={{
                [ASSET_FILTERS.CHANGED]: {
                  label: 'Changed',
                  defaultValue: filters[ASSET_FILTERS.CHANGED],
                  disabled: jobs.length <= 1,
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
              }}
              label={`Filters (${items.length}/${totalRowCount})`}
              hasActiveFilters={hasActiveFilters}
              onChange={updateFilters}
            />
          </div>
        </Stack>
      </Toolbar>
      <main>
        <MetricsTable
          runs={jobs}
          items={items}
          renderRowHeader={renderRowHeader}
          emptyMessage={emptyMessage}
          showHeaderSum
          title={<Title />}
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
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  updateSort: PropTypes.func.isRequired,
  customComponentLink: PropTypes.elementType,
};
