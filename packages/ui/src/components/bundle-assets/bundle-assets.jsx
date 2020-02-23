import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, map } from 'lodash';
import { FILE_TYPE_LABELS } from '@bundle-stats/utils';

import { FileName } from '../../ui/file-name';
import { Tooltip } from '../../ui/tooltip';
import { FiltersDropdown } from '../../ui/filters-dropdown';
import { SortDropdown } from '../../ui/sort-dropdown';
import { EmptySet } from '../../ui/empty-set';
import { MetricsTable } from '../metrics-table';
import {
  FILTER_ASSET, FILTER_CHANGED, FILTER_ENTRY, FILTER_CHUNK, FILTER_INITIAL,
} from './bundle-assets.constants';
import css from './bundle-assets.module.css';

const RUN_TITLE_CURRENT = 'Current';
const RUN_TITLE_BASELINE = 'Baseline';

const RUNS_LABELS = [
  RUN_TITLE_CURRENT,
  RUN_TITLE_BASELINE,
];

const getFileTypeFilters = (filters) => Object.entries(FILE_TYPE_LABELS)
  .map(([id, label]) => ({
    [id]: {
      label,
      defaultValue: get(filters, `fileTypes.${id}`, true),
    },
  }))
  .reduce((agg, current) => ({
    ...agg,
    ...current,
  }), {});

const getAddRunLabel = (run, index, runs) => {
  const internalBuildNumber = get(run, 'meta.internalBuildNumber', runs.length - index);
  const name = `Job #${internalBuildNumber}`;

  return {
    ...run,
    name,
  };
};

const TooltipNotPredictive = ({ runs }) => (
  <div className={css.tooltipNotPredictive}>
    <p className={css.tooltipNotPredictiveText}>
      File name is the same, but the size has changed:
    </p>
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

const TooltipFilename = ({ runs, labels }) => (
  <div className={css.tooltipFilename}>
    {runs.map((run, index) => {
      const key = index;

      return (
        <div className={css.tooltipFilenameItem} key={key}>
          <h5 className={css.tooltipFilenameTitle}>
            {labels[index]}
          </h5>
          <FileName name={run && run.name ? run.name : '-'} />
        </div>
      );
    })}
  </div>
);

TooltipFilename.defaultProps = {
  runs: [],
  labels: [],
};

TooltipFilename.propTypes = {
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  labels: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

const getRenderRowHeader = (labels) => (item) => (
  <div className={css.tableRowHeader}>
    {item.isNotPredictive && (
      <Tooltip
        className={css.notPredictive}
        title={<TooltipNotPredictive runs={item.runs} />}
        align="topLeft"
      >
        <span className={cx('ui-icon ui-icon--small', css.notPredictiveIcon)}>
          warning
        </span>
      </Tooltip>
    )}
    {item.isEntry && (
      <span
        title="Entrypoint"
        className={css.flagEntry}
      >
        e
      </span>
    )}
    {item.isInitial && (
      <span
        title="Initial"
        className={css.flagInitial}
      >
        i
      </span>
    )}
    {item.isChunk && (
      <span
        title="Chunk"
        className={css.flagChunk}
      >
        c
      </span>
    )}

    <Tooltip
      title={(
        <TooltipFilename runs={item.runs} labels={labels} />
      )}
      align="topLeft"
    >
      <FileName name={item.label} />
    </Tooltip>
  </div>
);

export const BundleAssets = (props) => {
  const {
    className,
    runs,
    items,
    updateFilters,
    resetFilters,
    totalRowCount,
    filters,
    sortItems,
    sort,
    updateSort,
  } = props;

  const labeledRuns = runs.map(getAddRunLabel);
  const emptyMessage = (
    <EmptySet
      resources="assets"
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
              disabled: runs.length <= 1,
            },
            entryTypes: {
              label: 'Entry type',
              [FILTER_ENTRY]: {
                label: 'Entry',
                defaultValue: get(filters, `entryTypes.${FILTER_ENTRY}`, true),
              },
              [FILTER_INITIAL]: {
                label: 'Initial',
                defaultValue: get(filters, `entryTypes.${FILTER_INITIAL}`, true),
              },
              [FILTER_CHUNK]: {
                label: 'Chunk',
                defaultValue: get(filters, `entryTypes.${FILTER_CHUNK}`, true),
              },
              [FILTER_ASSET]: {
                label: 'Asset',
                defaultValue: get(filters, `entryTypes.${FILTER_ASSET}`, true),
              },
            },
            fileTypes: {
              label: 'File type',
              ...getFileTypeFilters(filters),
            },
          }}
          label={`Filters (${items.length}/${totalRowCount})`}
          onChange={updateFilters}
        />
      </header>
      <main>
        <MetricsTable
          runs={labeledRuns}
          items={items}
          renderRowHeader={getRenderRowHeader(map(labeledRuns, 'name'))}
          emptyMessage={emptyMessage}
          showHeaderSum
        />
      </main>
    </section>
  );
};

BundleAssets.defaultProps = {
  className: '',
  totalRowCount: 0,
};

BundleAssets.propTypes = {
  className: PropTypes.string,
  runs: PropTypes.arrayOf(PropTypes.shape({
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
