import type { ComponentProps } from 'react';
import React from 'react';
import cx from 'classnames';

import css from './textarea.module.css';

export type TextareaProps = {
  size?: 'small' | 'medium' | 'large';
} & ComponentProps<'textarea'>;

export const Textarea = (props: TextareaProps) => {
  const { className = '', size = '', ...restProps } = props;

  const rootClassName = cx(css.root, size && css[size], className);

  return <textarea className={rootClassName} {...restProps} />;
};
