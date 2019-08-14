import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './metric.module.css';

// Separate value and unit
const EXTRACT_VALUE_UNIT_PATTERN = /([\d|.|,| ]*)(\w*|%)$/;

export const Metric = ({
  className, value, formatter, children, enhanced,
}) => {
  const formattedValue = formatter(value);

  // eslint-disable-next-line no-unused-vars
  const [matched, displayValue, displayUnit] = (enhanced && formattedValue)
    ? formattedValue.match(EXTRACT_VALUE_UNIT_PATTERN)
    : [null, formattedValue, null];

  return (
    <code className={cx(className, styles.root)}>
      <div className={styles.display}>
        <span className={styles.displayValue}>
          {displayValue}
        </span>
        {displayUnit && (
          <span className={styles.displayUnit}>
            {displayUnit}
          </span>
        )}
      </div>
      <span className={styles.delta}>
        {children}
      </span>
    </code>
  );
};

Metric.defaultProps = {
  className: '',
  enhanced: false,
  value: 0,
  children: [],
  formatter: (val) => val,
};

Metric.propTypes = {
  className: PropTypes.string,
  enhanced: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  formatter: PropTypes.func,
  children: PropTypes.node,
};
