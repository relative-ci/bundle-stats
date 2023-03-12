import React, { useMemo } from 'react';
import cx from 'classnames';

import css from './metric.module.css';

// Separate value and unit
const EXTRACT_VALUE_UNIT_PATTERN = /([\d|.|,| ]*)(\w*|%)$/;

export interface MetricProps {
  /**
   * Metric value
   */
  value?: string | number;
  /**
   * Metric value formatter
   */
  formatter?: (val: string | number) => string;
  /**
   * Inline variant - render children inline
   */
  inline?: boolean;
  /**
   * enhanced variant - extract and style unit
   */
  enhanced?: boolean;
}

export const Metric = (props: MetricProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    value = 0,
    formatter = (val) => val.toString(),
    inline = false,
    enhanced = false,
    children = null,
  } = props;

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
