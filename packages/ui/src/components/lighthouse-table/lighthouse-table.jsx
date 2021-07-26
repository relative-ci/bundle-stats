import React from 'react';
import PropTypes from 'prop-types';
import * as lighthouse from '@bundle-stats/utils/lib-esm/lighthouse';

import { MetricsTable } from '../metrics-table';

export const LighthouseTable = (props) => {
  const {
    className,
    jobs,
  } = props;

  const items = lighthouse.compare(jobs);

  return (
    <MetricsTable
      className={className}
      runs={jobs}
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
