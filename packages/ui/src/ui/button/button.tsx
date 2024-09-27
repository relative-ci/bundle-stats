import React from 'react';
import cx from 'classnames';
import { Button as ButtonBaseComponent } from 'ariakit/button';

import { Icon as BaseIcon } from '../icon';
import css from './button.module.css';

export const BUTTON_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const BUTTON_KIND = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DANGE: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  SUCCES: 'success',
} as const;

export const BUTTON_GLYPHS = BaseIcon.ICONS;

type Size = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
type Kind = (typeof BUTTON_KIND)[keyof typeof BUTTON_KIND];

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

const ButtonComponent = <T extends React.ElementType = 'button'>(
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
    children = null,
    Icon = BaseIcon,
    glyph,
    rightGlyph,
    ...restProps
  } = props;

  // Set padding and radius when provided or when outline/solid variations are set
  const resolvedPadding = padding || ((outline || solid) && size);
  const resolvedRadius = radius || ((outline || solid) && size);

  const resolvedSize = Object.values(BUTTON_SIZE).includes(size) ? size : BUTTON_SIZE.MEDIUM;

  const rootClassName = cx(
    css.root,
    kind && css[kind],
    css[resolvedSize],

    outline && css.outline,
    outline && css[`outline--${kind}`],

    solid && css.solid,
    solid && css[`solid--${kind}`],

    resolvedPadding && css.padding,
    resolvedRadius && css[`radius--${resolvedRadius}`],

    active && css.active,
    active && outline && css[`active-outline-${kind}`],

    className,
  );

  return (
    <Component {...restProps} className={rootClassName}>
      {glyph && <Icon glyph={glyph} className={css.glyph} />}
      {children && <span className={css.content}>{children}</span>}
      {rightGlyph && <Icon glyph={rightGlyph} className={css.glyph} />}
    </Component>
  );
};

export const Button = React.forwardRef(ButtonComponent);
