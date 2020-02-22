import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import * as lighthouse from '@bundle-stats/utils/lib-esm/lighthouse';

import { MetricsTable } from '../metrics-table';
import { JobName } from '../job-name';

const getRunLabel = (job, index, jobs) => {
  const internalBuildNumber = get(job, 'internalBuildNumber', jobs.length - index);
  const name = `Job #${internalBuildNumber}`;

  // @TODO: move into a shared component
  return {
    name,
    label: (
      <JobName
        title={index === 0 ? 'Current' : 'Baseline'}
        internalBuildNumber={internalBuildNumber}
      />
    ),
  };
};

export const LighthouseTable = (props) => {
  const {
    className,
    jobs,
  } = props;
  const items = lighthouse.compare(jobs);
  const runs = jobs.map(getRunLabel);

  return (
    <MetricsTable
      className={className}
      runs={runs}
      items={items}
    />
  );
};

LighthouseTable.defaultProps = {
  className: '',
  jobs: [],
};

LighthouseTable.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
