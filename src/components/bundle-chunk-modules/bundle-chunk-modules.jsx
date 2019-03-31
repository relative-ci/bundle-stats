import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { TableFilters } from '../../ui';
import { JobName } from '../job-name';
import { MetricsTable } from '../metrics-table';
import css from './bundle-chunk-modules.css';

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

  return {
    ...run,
    label: <JobName label="Baseline" internalBuildNumber={run.meta.internalBuildNumber} />,
  };
};

export const BundleChunkModules = ({
  className,
  title,
  rows,
  runs,
  totalRowsCount,
  updateFilters,
}) => {
  const labeledRuns = runs.map(getRunLabel);
  const rootClassName = cx(css.root, className);

  return (
    <div className={rootClassName}>
      <header className={css.header}>
        {title && (
          <h3 className={css.title}>
            {title}
          </h3>
        )}
        <TableFilters
          filters={{
            changed: {
              label: 'Changed',
              defaultValue: true,
            },
          }}
          label={`Filters (${rows.length}/${totalRowsCount})`}
          onChange={updateFilters}
        />
      </header>
      <MetricsTable
        rows={rows}
        runs={labeledRuns}
      />
    </div>
  );
};

BundleChunkModules.defaultProps = {
  className: '',
  title: '',
  rows: [],
  runs: [],
  totalRowsCount: 0,
};

BundleChunkModules.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Section title */
  title: PropTypes.string,

  /** Rows data */
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Runs data */
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** totals row count */
  totalRowsCount: PropTypes.number,

  /** Update filters handler */
  updateFilters: PropTypes.func.isRequired,
};
