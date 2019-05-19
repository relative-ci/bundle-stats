import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { last } from 'lodash';

import { Box, TableFilters, Tooltip } from '../../ui';
import { JobName } from '../job-name';
import { MetricsTable } from '../metrics-table';
import css from './bundle-chunk-modules.module.css';

// css ./node_modules/css-loader/dist/cjs.js??ref--6-0!./src/assets/styles/default.styl
const NAME_WITH_LOADERS = /!/;

const getModuleShortName = (label) => {
  if (NAME_WITH_LOADERS.test(label)) {
    return last(label.split(NAME_WITH_LOADERS));
  }

  return label;
};

const renderRowHeader = (metric) => {
  const { label } = metric;
  const shortName = getModuleShortName(label);

  if (shortName === label) {
    return label;
  }

  return (
    <Tooltip
      title={(
        <div className={css.nameTooltip}>
          <span className={css.nameTooltipText}>
            {label}
          </span>
        </div>
      )}
      align="topLeft"
    >
      <span className={css.name}>
        {shortName}
      </span>
    </Tooltip>
  );
};

const getRunLabel = (run, index) => {
  // No baseline?
  if (!run || !run.meta) {
    return {
      ...run,
      label: '-',
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
  };
};

export const BundleChunkModules = ({
  className,
  title,
  rows,
  runs,
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
          label={`Filters (${rows.length}/${totalRowsCount})`}
          onChange={updateFilters}
        />
      </header>
      <MetricsTable
        className={css.table}
        rows={rows}
        runs={labeledRuns}
        renderRowHeader={renderRowHeader}
      />
    </Box>
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

  /** Filters data */
  filters: PropTypes.shape({
    changed: PropTypes.bool,
  }).isRequired,
};
