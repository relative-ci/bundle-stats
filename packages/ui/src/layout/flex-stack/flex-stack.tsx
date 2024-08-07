import React from 'react';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../tokens';
import css from './flex-stack.module.css';

type SpaceValue = (typeof SPACES)[number];

interface FlexStackProps<T extends React.ElementType> {
  as?: T;
  space?: SpaceValue;
  inline?: boolean;
  alignItems?: 'top' | 'center' | 'bottom';
}

export const FlexStack = <T extends React.ElementType = 'div'>(
  props: FlexStackProps<T> & Omit<React.ComponentProps<T>, keyof FlexStackProps<T>>,
) => {
  const {
    as: Component = 'div',
    className = '',
    space = NO_SPACE,
    inline = false,
    alignItems = '',
    ...restProps
  } = props;

  const rootClassName = cx(
    css.root,
    css[`space--${space}`],
    css[`align-items--${alignItems}`],
    inline && css.inline,
    className,
  );

  return <Component {...restProps} className={rootClassName} />;
};
