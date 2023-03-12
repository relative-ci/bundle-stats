import React from 'react';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../tokens';
import css from './box.module.css';

type SpaceValue = (typeof SPACES)[number];

interface BoxProps<T extends React.ElementType> {
  as?: T;
  padding?: SpaceValue | [SpaceValue, SpaceValue];
  horizontalPadding?: SpaceValue;
  verticalPadding?: SpaceValue;
  outline?: boolean;
  outlineHover?: boolean;
}

export const Box = <T extends React.ElementType = 'div'>(
  props: BoxProps<T> & Omit<React.ComponentProps<T>, keyof BoxProps<T>>,
) => {
  const {
    className = '',
    as: Component = 'div',
    padding = NO_SPACE,
    horizontalPadding = '',
    verticalPadding = '',
    outline = false,
    outlineHover = false,
    ...restProps
  } = props;

  const [resolvedPadding, resolvedVerticalPadding, resolvedHorizontalPadding] = Array.isArray(
    padding,
  )
    ? [null, ...padding]
    : [padding, verticalPadding, horizontalPadding];

  const rootClassName = cx(
    css.root,
    className,
    resolvedPadding && css[`padding-${resolvedPadding}`],
    resolvedVerticalPadding && css[`vertical-padding-${resolvedVerticalPadding}`],
    resolvedHorizontalPadding && css[`horizontal-padding-${resolvedHorizontalPadding}`],
    outline && css.outline,
    outlineHover && css.outlineHover,
  );

  return <Component {...restProps} className={rootClassName} />;
};
