import PropTypes from 'prop-types';

import styles from './metric.css';

const Metric = ({ value, formatter, children }) => (
  <code class={styles.root}>
    {formatter(value)}
    <span class={styles.delta}>
      {children}
    </span>
  </code>
);

Metric.defaultProps = {
  value: 0,
  children: [],
};

Metric.propTypes = {
  value: PropTypes.number,
  formatter: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Metric;
