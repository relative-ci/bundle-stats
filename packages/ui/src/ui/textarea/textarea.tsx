import type { ComponentProps } from 'react';
import React from 'react';
import cx from 'classnames';

import css from './textarea.module.css';

export type TextareaProps = {
  previewSource?: boolean;
  size?: 'small' | 'medium' | 'large';
} & ComponentProps<'textarea'>;

export const Textarea = (props: TextareaProps) => {
  const { className = '', previewSource = false, size = '', ...restProps } = props;

  const rootClassName = cx(
    css.root,
    previewSource && css.previewSource,
    size && css[size],
    className,
  );

  return <textarea className={rootClassName} {...restProps} />;
};
