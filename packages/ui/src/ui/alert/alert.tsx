import React from 'react';
import cx from 'classnames';

import { KIND } from '../../tokens';
import { Box } from '../../layout/box';
import css from './alert.module.css';

interface AlertProps {
  kind?: (typeof KIND)[keyof typeof KIND];
}

export const Alert = (props: AlertProps & React.ComponentProps<typeof Box>) => {
  const { className = '', kind = 'default', ...restProps } = props;

  return (
    <Box
      padding={['xsmall', 'small']}
      outline
      className={cx(css.root, className, css[kind])}
      {...restProps}
    />
  );
};
