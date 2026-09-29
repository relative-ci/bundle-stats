import React from 'react';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../tokens';
import css from './flex-stack.module.css';

type SpaceValue = (typeof SPACES)[number];

export type FlexStackProps<T extends React.ElementType> = {
  as?: T;
  gap?: SpaceValue;
  /**
   * @deprecated Use `gap` instead.
   */
  space?: SpaceValue;
  inline?: boolean;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  alignItems?: 'top' | 'center' | 'bottom';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export const FlexStack = <T extends React.ElementType = 'div'>(
  props: FlexStackProps<T> & Omit<React.ComponentProps<T>, keyof FlexStackProps<T>>,
) => {
  const {
    as: Component = 'div',
    className = '',
    gap,
    space,
    inline = false,
    direction = '',
    wrap = '',
    alignItems = '',
    justifyContent = '',
    ...restProps
  } = props;

  const rootClassName = cx(
    css.root,
    css[`gap--${gap ?? space ?? NO_SPACE}`],
    css[`direction--${direction}`],
    css[`wrap--${wrap}`],
    css[`align-items--${alignItems}`],
    css[`justify-content--${justifyContent}`],
    inline && css.inline,
    className,
  );

  return <Component {...restProps} className={rootClassName} />;
};
