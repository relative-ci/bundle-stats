import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, map } from 'lodash';

import {
  Box, FileName, TableFilters, Tooltip,
} from '../../ui';
import { JobName } from '../job-name';
import { MetricsTable } from '../metrics-table';
import css from './bundle-chunk-modules.module.css';

const getRenderRowHeader = labels => row => (
  <Tooltip
    title={(
      <div className={css.nameTooltip}>
        {row.runs.map((run, index) => {
          const key = index;

          return (
            <React.Fragment key={key}>
              <h6>{labels[index]}</h6>
              {(run && run.name) ? (
                <FileName
                  className={css.nameTooltipText}
                  name={run.name}
                />
              ) : '-' }
            </React.Fragment>
          );
        })}
      </div>
      )}
    align="topLeft"
  >
    <FileName
      className={css.name}
      name={row.label}
    />
  </Tooltip>
);

const getRunLabel = (run, index, runs) => {
  const internalBuildNumber = get(run, 'meta.internalBuildNumber');
  const name = `Job #${internalBuildNumber || (runs.length - index)}`;

  // No baseline?
  if (!run || !run.meta) {
    return {
      ...run,
      label: name,
      name,
    };
  }

  return {
    ...run,
    label: (
      <JobName
        title={index === 0 ? 'Current' : 'Baseline'}
        internalBuildNumber={run.meta.internalBuildNumber}
      />
    ),
    name,
  };
};

export const BundleChunkModules = ({
  className,
  title,
  runs,
  modules,
  totalRowsCount,
  updateFilters,
  filters,
}) => {
  const labeledRuns = runs.map(getRunLabel);
  const rootClassName = cx(css.root, className);

  return (
    <Box className={rootClassName}>
      <header className={css.header}>
        {title && (
          <h3 className={css.headerTitle}>
            {title}
          </h3>
        )}
        <TableFilters
          filters={{
            changed: {
              label: 'Changed',
              defaultValue: filters.changed,
              disabled: runs.length <= 1,
            },
          }}
          label={`Filters (${modules.length}/${totalRowsCount})`}
          onChange={updateFilters}
        />
      </header>
      <MetricsTable
        className={css.table}
        items={modules}
        runs={labeledRuns}
        renderRowHeader={getRenderRowHeader(map(labeledRuns, 'name'))}
      />
    </Box>
  );
};

BundleChunkModules.defaultProps = {
  className: '',
  title: '',
  modules: [],
  runs: [],
  totalRowsCount: 0,
};

BundleChunkModules.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Section title */
  title: PropTypes.string,

  /** Rows data */
  modules: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** Runs data */
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** totals row count */
  totalRowsCount: PropTypes.number,

  /** Update filters handler */
  updateFilters: PropTypes.func.isRequired,

  /** Filters data */
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,
};
