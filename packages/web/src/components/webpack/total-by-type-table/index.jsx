import PropTypes from 'prop-types';

import MetricsTable from '../../metrics-table';
import enhance from './container';

const TotalByTypeTable = ({ runs, rows }) => (
  <MetricsTable runs={runs} rows={rows} />
);

TotalByTypeTable.defaultProps = {
  runs: [],
  rows: [],
};

TotalByTypeTable.propTypes = {
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default enhance(TotalByTypeTable);
