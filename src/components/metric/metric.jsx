import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './metric.css';

export const Metric = ({
  className, value, formatter, children,
}) => (
  <code className={cx(className, styles.root)}>
    {formatter(value)}
    <span className={styles.delta}>
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
