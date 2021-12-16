import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Box } from '../../layout/box';
import css from './alert.module.css';

export const Alert = (props) => {
  const { className, kind, children, ...restProps } = props;

  return (
    <Box
      padding={['xsmall', 'small']}
      outline
      className={cx(css.root, className, css[kind])}
      {...restProps}
    >
      {children}
    </Box>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Alert.defaultProps = {
  className: '',
  kind: 'default',
};
