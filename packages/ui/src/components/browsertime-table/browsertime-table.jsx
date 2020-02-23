import React from 'react';
import PropTypes from 'prop-types';
import * as browsertime from '@bundle-stats/utils';

import { MetricsTable } from '../metrics-table';

export const BrowsertimeTable = (props) => {
  const {
    className,
    jobs,
  } = props;

  const items = browsertime.compare(jobs);

  return (
    <MetricsTable
      className={className}
      items={items}
      runs={jobs}
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
