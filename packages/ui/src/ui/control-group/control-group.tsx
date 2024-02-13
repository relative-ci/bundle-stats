import React from 'react';
import cx from 'classnames';

import { FlexStack } from '../../layout/flex-stack';
import css from './control-group.module.css';

export const ControlGroup = (props: React.ComponentProps<typeof FlexStack>) => {
  const { className = '', ...restProps } = props;
  return (
    <FlexStack
      className={cx(css.root, className)}
      space="no-space"
      alignItems="center"
      {...restProps}
    />
  );
};
