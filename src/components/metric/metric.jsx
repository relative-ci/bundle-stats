import PropTypes from 'prop-types';

const Metric = ({ value, formatter }) => (
  <code>{formatter(value)}</code>
);

Metric.defaultProps = {
  value: 0,
};

Metric.propTypes = {
  value: PropTypes.number,
  formatter: PropTypes.func.isRequired,
};

export default Metric;
