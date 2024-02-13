import React from 'react';
import cx from 'classnames';
import { Button as ButtonBaseComponent } from 'ariakit/button';

import { Icon as BaseIcon } from '../icon';
import css from './button.module.css';

const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

const KIND = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGE: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  SUCCES: 'success',
} as const;

type Size = (typeof SIZE)[keyof typeof SIZE];
type Kind = (typeof KIND)[keyof typeof KIND];

interface ButtonProps<T extends React.ElementType> {
  outline?: boolean;
  solid?: boolean;
  active?: boolean;
  kind?: Kind | 'default';
  size?: Size;
  radius?: Size | 'circle' | 'none';
  padding?: Size | 'none';
  as?: T;
  Icon?: React.ElementType;
  glyph?: React.ComponentProps<typeof BaseIcon>['glyph'];
  rightGlyph?: React.ComponentProps<typeof BaseIcon>['glyph'];
}

export const Button = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
) => {
  const {
    className = '',
    outline = false,
    solid = false,
    active = false,
    kind = 'default',
    size = 'medium',
    radius = '',
    padding = '',
    as: Component = ButtonBaseComponent,
    children,
    Icon = BaseIcon,
    glyph,
    rightGlyph,
    ...restProps
  } = props;

  // Set padding and radius when provided or when outline/solid variations are set
  const resolvedPadding = padding || ((outline || solid) && size);
  const resolvedRadius = radius || ((outline || solid) && size);

  const rootClassName = cx(
    css.root,
    css[size],
    kind && css[kind],

    outline && css.outline,
    outline && css[`outline--${kind}`],

    solid && css.solid,
    solid && css[`solid--${kind}`],

    resolvedPadding && css[`padding--${resolvedPadding}`],
    resolvedPadding && outline && css[`outline--padding--${resolvedPadding}`],
    resolvedRadius && css[`radius--${resolvedRadius}`],

    active && css.active,
    active && outline && css[`active-outline-${kind}`],

    css[size],
    className,
  );

  return (
    <Component {...restProps} className={rootClassName}>
      {glyph && <Icon glyph={glyph} size={size} className={css.glyph} />}
      {children && <span className={css.content}>{children}</span>}
      {rightGlyph && <Icon glyph={glyph} size={size} className={css.glyph} />}
    </Component>
  );
};

Button.SIZE = SIZE;
Button.KIND = KIND;
