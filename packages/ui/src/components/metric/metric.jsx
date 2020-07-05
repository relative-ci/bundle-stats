import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './metric.module.css';

// Separate value and unit
const EXTRACT_VALUE_UNIT_PATTERN = /([\d|.|,| ]*)(\w*|%)$/;

export const Metric = ({ className, value, formatter, inline, anchored, children, enhanced }) => {
  const formattedValue = formatter(value);

  // eslint-disable-next-line no-unused-vars
  const [matched, displayValue, displayUnit] =
    enhanced && formattedValue
      ? formattedValue.match(EXTRACT_VALUE_UNIT_PATTERN)
      : [null, formattedValue, null];

  const rootClassName = cx(
    className,
    styles.root,
    inline && styles.inline,
    anchored && styles.anchored,
  );

  return (
    <span className={rootClassName}>
      <span className={styles.display}>
        <span className={styles.displayValue}>{displayValue}</span>
        {displayUnit && <span className={styles.displayUnit}>{displayUnit}</span>}
      </span>
      <span className={styles.delta}>{children}</span>
    </span>
  );
};

Metric.defaultProps = {
  className: '',
  anchored: false,
  enhanced: false,
  inline: false,
  value: 0,
  children: [],
  formatter: (val) => val,
};

Metric.propTypes = {
  className: PropTypes.string,
  enhanced: PropTypes.bool,
  inline: PropTypes.bool,
  anchored: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  formatter: PropTypes.func,
  children: PropTypes.node,
};
