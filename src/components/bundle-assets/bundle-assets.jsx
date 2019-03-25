import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FILE_TYPE_LABELS } from '@relative-ci/utils';

import { Tooltip } from '../tooltip';
import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';
import { TableFilters } from '../table-filters';
import {
  FILTER_ASSET, FILTER_CHANGED, FILTER_ENTRY, FILTER_CHUNK, FILTER_INITIAL,
} from './bundle-assets.constants';
import css from './bundle-assets.css';

const RUNS_LABELS = [
  'Current',
  'Baseline',
];

const getFileTypeFilters = () => Object.entries(FILE_TYPE_LABELS)
  .map(([id, label]) => ({
    [id]: {
      label,
      defaultValue: true,
    },
  }))
  .reduce((agg, current) => ({
    ...agg,
    ...current,
  }), {});

const getRunLabel = (run, index) => {
  // Current run
  if (index === 0) {
    return {
      ...run,
      label: ' ',
    };
  }

  // No baseline?
  if (!run || !run.meta) {
    return {
      ...run,
      label: '-',
    };
  }

  // @TODO: move into a shared component
  return {
    ...run,
    label: (
      <JobName
        title="Baseline"
        internalBuildNumber={run.meta.internalBuildNumber}
      />
    ),
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

const TooltipFilename = ({ runs }) => (
  <div className={css.tooltipFilename}>
    <table className={css.tooltipTable}>
      <tbody>
        {runs.map(({ name }, index) => {
          const key = index;
          return (
            <tr key={key}>
              <th>{RUNS_LABELS[index]}</th>
              <td>{name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

TooltipFilename.defaultProps = {
  runs: [],
};

TooltipFilename.propTypes = {
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export const BundleAssets = (props) => {
  const {
    className,
    runs,
    rows,
    updateFilters,
    totalRowCount,
  } = props;

  const labeledRuns = runs.map(getRunLabel);

  return (
    <section className={cx(css.root, className)}>
      <header className={css.header}>
        {/* @TODO: get default values from parent state */}
        <TableFilters
          filters={{
            [FILTER_CHANGED]: {
              label: 'Changed',
              defaultValue: true,
            },
            entryTypes: {
              label: 'Entry type',
              [FILTER_ENTRY]: {
                label: 'Entry',
                defaultValue: true,
              },
              [FILTER_INITIAL]: {
                label: 'Initial',
                defaultValue: true,
              },
              [FILTER_CHUNK]: {
                label: 'Chunk',
                defaultValue: true,
              },
              [FILTER_ASSET]: {
                label: 'Asset',
                defaultValue: true,
              },
            },
            fileTypes: {
              label: 'File type',
              ...getFileTypeFilters(),
            },
          }}
          className={css.filters}
          label={`Filters (${rows.length}/${totalRowCount})`}
          onChange={updateFilters}
        />
      </header>
      <main>
        <MetricsTable
          runs={labeledRuns}
          rows={rows}
          renderRowHeader={(metric, row) => (
            <React.Fragment>
              {row.isNotPredictive && (
                <Tooltip
                  className={css.notPredictive}
                  title={<TooltipNotPredictive runs={row.runs} />}
                  align="topLeft"
                >
                  <span className={cx('ui-icon ui-icon--small', css.notPredictiveIcon)}>
                    warning
                  </span>
                </Tooltip>
              )}
              {row.isEntry && (
                <span
                  title="Entrypoint"
                  className={css.flagEntry}
                >
                  e
                </span>
              )}
              {row.isInitial && (
                <span
                  title="Initial"
                  className={css.flagInitial}
                >
                  i
                </span>
              )}
              {row.isChunk && (
                <span
                  title="Chunk"
                  className={css.flagChunk}
                >
                  c
                </span>
              )}
              <Tooltip title={<TooltipFilename runs={row.runs} />}>
                {metric.label}
              </Tooltip>
            </React.Fragment>
          )}
        />
      </main>
    </section>
  );
};

BundleAssets.defaultProps = {
  className: '',
  runs: [],
  rows: [],
  totalRowCount: 0,
};

BundleAssets.propTypes = {
  className: PropTypes.string,
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  updateFilters: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number,
};
