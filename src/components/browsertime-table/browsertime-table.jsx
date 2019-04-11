import React from 'react';
import PropTypes from 'prop-types';

import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';

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

export const BrowsertimeTable = (props) => {
  const {
    className,
    runs,
    rows,
  } = props;

  const labeledRuns = runs.map(getRunLabel);

  return (
    <MetricsTable
      className={className}
      runs={labeledRuns}
      rows={rows}
    />
  );
};

BrowsertimeTable.defaultProps = {
  className: '',
  runs: [],
  rows: [],
};

BrowsertimeTable.propTypes = {
  className: PropTypes.string,
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
