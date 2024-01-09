import React from 'react';
import cx from 'classnames';

import css from './input.module.css';

interface InputProps {
  size?: 'small' | 'medium' | 'large';
}

export const Input = (props: InputProps & Omit<React.ComponentProps<'input'>, 'size'>) => {
  const { className = '', size = 'medium', ...restProps } = props;

  const rootClassName = cx(css.root, className, css[size]);

  return <input className={rootClassName} {...restProps} />;
};
