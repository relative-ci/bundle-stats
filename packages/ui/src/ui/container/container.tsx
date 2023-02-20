import React from 'react';
import cx from 'classnames';

// @ts-ignore
import css from './container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = ({
  as: Component = 'div',
  className = '',
  ...restProps
}: ContainerProps) => (
  <Component className={cx(css.root, className)}>
    <div className={css.inner} {...restProps} />
  </Component>
);
