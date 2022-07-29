import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './metric.module.css';

// Separate value and unit
const EXTRACT_VALUE_UNIT_PATTERN = /([\d|.|,| ]*)(\w*|%)$/;

export const Metric = ({ className, value, formatter, inline, children, enhanced }) => {
  const { displayValue, displayUnit } = useMemo(() => {
    const formattedValue = formatter?.(value);

    if (!formattedValue) {
      return { displayValue: value };
    }

    if (!enhanced) {
      return { displayValue: formattedValue };
    }

    const matches = formattedValue.match(EXTRACT_VALUE_UNIT_PATTERN);

    if (!matches) {
      return { displayValue: value };
    }

    return {
      displayUnit: matches[2],
      displayValue: matches[1],
    };
  }, [formatter, value]);

  const rootClassName = cx(className, css.root, inline && css.inline);

  return (
    <div className={rootClassName}>
      <div className={css.display}>
        <span className={css.displayValue}>{displayValue}</span>
        {displayUnit && <span className={css.displayUnit}>{displayUnit}</span>}
      </div>
      <div className={css.delta}>{children}</div>
    </div>
  );
};

Metric.defaultProps = {
  className: '',
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
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  formatter: PropTypes.func,
  children: PropTypes.node,
};
