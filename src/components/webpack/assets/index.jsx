import PropTypes from 'prop-types';

import MetricsTable from '../../metrics-table';
import Filter from './filter';
import enhance from './container';

const Assets = (props) => {
  const {
    runs,
    rows,
    show,
    setShow,
  } = props;

  return (
    <div>
      <Filter
        active={show}
        onChange={setShow}
      />
      <MetricsTable
        runs={runs}
        rows={rows}
      />
    </div>
  );
};

Assets.defaultProps = {
  runs: [],
  rows: [],
};

Assets.propTypes = {
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  show: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default enhance(Assets);
