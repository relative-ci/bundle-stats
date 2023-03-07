import React from 'react';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../tokens';
// @ts-ignore
import css from './box.module.css';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  padding?: typeof SPACES | Array<typeof SPACES>;
  horizontalPadding?: string;
  verticalPadding?: string;
  outline?: boolean;
  outlineHover?: boolean;
}

export const Box = (props: BoxProps) => {
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
