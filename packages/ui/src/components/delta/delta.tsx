import React from 'react';
import cx from 'classnames';
import type { MetricRunInfoDeltaType } from '@bundle-stats/utils';

import css from './delta.module.css';

export interface DeltaProps {
  /**
   * Formatted delta value
   */
  displayValue: string;
  /**
   * Delta type - drives the color scale
   */
  deltaType: MetricRunInfoDeltaType;
  /**
   * Inverted variant - render the delta type as background color
   */
  inverted?: boolean;
}

export const Delta = (props: DeltaProps & React.ComponentProps<'span'>) => {
  const { className = '', displayValue, deltaType, inverted = false, ...restProps } = props;

  const rootClassName = cx(css.root, className, inverted && css.inverted, css[deltaType]);

  return (
    <span className={rootClassName} {...restProps}>
      {displayValue}
    </span>
  );
};
