import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';
import { FILE_TYPE_LABELS } from '@relative-ci/utils';

import { FileName } from '../../ui/file-name';
import { Tooltip } from '../../ui/tooltip';
import { TableFilters } from '../../ui/table-filters';
import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';
import {
  FILTER_ASSET, FILTER_CHANGED, FILTER_ENTRY, FILTER_CHUNK, FILTER_INITIAL,
} from './bundle-assets.constants';
import css from './bundle-assets.module.css';

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

const addRunLabel = (run, index) => {
  const internalBuildNumber = get(run, 'meta.internalBuildNumber');
  const label = internalBuildNumber ? (
    <JobName
      title={index === 0 ? 'Current' : 'Baseline'}
      internalBuildNumber={internalBuildNumber}
    />
  ) : ' ';

  return {
    ...run,
    label,
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
            <div key={key}>
              <h6>{RUNS_LABELS[index]}</h6>
              {name ?  <FileName name={name} /> : '-'}
            </div>
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

const renderRowHeader = (metric, row) => (
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
    <Tooltip
      title={<TooltipFilename runs={row.runs} />}
      align="topLeft"
    >
      <FileName name={metric.label} />
    </Tooltip>
  </React.Fragment>
);

export const BundleAssets = (props) => {
  const {
    className,
    runs,
    rows,
    updateFilters,
    totalRowCount,
    filters,
  } = props;

  const labeledRuns = runs.map(addRunLabel);

  return (
    <section className={cx(css.root, className)}>
      <header className={css.header}>
        {/* @TODO: get default values from parent state */}
        <TableFilters
          filters={{
            [FILTER_CHANGED]: {
              label: 'Changed',
              defaultValue: filters.changed,
              disabled: runs.length <= 1,
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
          renderRowHeader={renderRowHeader}
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
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,
};
