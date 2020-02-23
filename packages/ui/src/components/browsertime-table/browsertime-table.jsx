import React from 'react';
import PropTypes from 'prop-types';
import * as browsertime from '@bundle-stats/utils';
import { get } from 'lodash';

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

export const BrowsertimeTable = (props) => {
  const {
    className,
    jobs,
  } = props;

  const items = browsertime.compare(jobs);
  const runs = jobs.map(getRunLabel);

  return (
    <MetricsTable
      className={className}
      runs={runs}
      items={items}
    />
  );
};

BrowsertimeTable.defaultProps = {
  className: '',
  jobs: [],
};

BrowsertimeTable.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
