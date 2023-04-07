import React from 'react';
import cx from 'classnames';

import { KIND, SIZE } from '../../tokens';
import css from './tag.module.css';

interface TagProps {
  as?: React.ElementType;
  kind?: (typeof KIND)[keyof typeof KIND];
  size?: (typeof SIZE)[keyof typeof SIZE];
}

export const Tag = (props: TagProps & React.ComponentProps<'span'>) => {
  const {
    className = '',
    as: Component = 'span',
    kind = KIND.DEFAULT,
    size = SIZE.MEDIUM,
    ...restProps
  } = props;

  const rootClassName = cx(css.root, className, css[kind], css[size]);

  return <Component className={rootClassName} {...restProps} />;
};

Tag.KINDS = KIND;
Tag.SIZES = SIZE;
