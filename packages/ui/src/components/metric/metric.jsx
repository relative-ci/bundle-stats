import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './metric.module.css';

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
  className: '',
  value: 0,
  children: [],
  formatter: val => val,
};

Metric.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  formatter: PropTypes.func,
  children: PropTypes.node,
};
