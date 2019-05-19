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

export const LighthouseTable = (props) => {
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

LighthouseTable.defaultProps = {
  className: '',
  runs: [],
  rows: [],
};

LighthouseTable.propTypes = {
  className: PropTypes.string,
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
