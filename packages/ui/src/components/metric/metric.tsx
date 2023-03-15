import React from 'react';
import cx from 'classnames';

import css from './metric.module.css';

export interface MetricProps {
  /**
   * Metric value
   */
  value?: React.ReactNode;
  /**
   * Metric value unit
   */
  unit?: string;
  /**
   * Inline variant - render children inline
   */
  inline?: boolean;
}

export const Metric = (props: MetricProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    value = '0',
    unit = '',
    inline = false,
    children = null,
    ...restProps
  } = props;

  const rootClassName = cx(className, css.root, inline && css.inline);

  return (
    <div className={rootClassName} {...restProps}>
      <div className={css.display}>
        <span className={css.displayValue}>{value}</span>
        {unit && <span className={css.displayUnit}>{unit}</span>}
      </div>
      {children && <div className={css.content}>{children}</div>}
    </div>
  );
};
