import React from 'react';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../tokens';
import { getRenderChildWithClassName } from '../../utils';
import css from './stack.module.css';

export type StackProps = {
  as?: React.ElementType;
  space?: (typeof SPACES)[number];
};

export const Stack = (props: StackProps & React.ComponentProps<'div'>) => {
  const { className = '', as: Component = 'div', space = NO_SPACE, children, ...restProps } = props;
  const rootClassName = cx(css.root, className, css[`space--${space}`]);

  return (
    <Component {...restProps} className={rootClassName}>
      {React.Children.map(children, getRenderChildWithClassName(css.item))}
    </Component>
  );
};
