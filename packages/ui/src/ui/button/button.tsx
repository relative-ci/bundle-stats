import React from 'react';
import cx from 'classnames';
import { Button as ButtonBaseComponent } from 'ariakit/button';

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

interface ButtonProps {
  outline?: boolean;
  solid?: boolean;
  kind?: Kind | 'default';
  size?: Size;
  radius?: Size | 'circle' | 'none';
  padding?: Size | 'none';
}

export const Button = (props: ButtonProps & React.ComponentProps<typeof ButtonBaseComponent>) => {
  const {
    className = '',
    outline = false,
    solid = false,
    kind = 'default',
    size = 'medium',
    radius = '',
    padding = '',
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
    resolvedRadius && css[`radius--${resolvedRadius}`],

    css[size],
    className,
  );

  return <ButtonBaseComponent {...restProps} className={rootClassName} />;
};

Button.SIZE = SIZE;
Button.KIND = KIND;
