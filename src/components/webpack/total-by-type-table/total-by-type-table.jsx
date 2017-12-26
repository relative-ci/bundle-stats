import PropTypes from 'prop-types';

import metrics from '../../../config/metrics';
import Metric from '../../metric';
import Table from '../../table';

const getHeaders = entries => ([
  '',
  ...entries.map(({ label }) => ({
    text: label,
    options: {
      align: 'right',
    },
  })),
]);

// @TODO refactor
const getRows = entries => ([
  ...Object.keys(metrics.webpack).map(key => ({
    header: metrics.webpack[key].label,
    cells: entries.map(({ stats }) => (
      <Metric
        value={stats[key]}
        formatter={metrics.webpack[key].formatter}
      />
    )),
  })),
]);

const TotalByTypeTable = ({ entries }) => (
  <Table
    headers={getHeaders(entries)}
    rows={getRows(entries)}
  />
);

TotalByTypeTable.defaultProps = {
  entries: [],
};

TotalByTypeTable.propTypes = {
  entries: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default TotalByTypeTable;
