import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Box } from '../box';
import css from './alert.module.css';

export const Alert = (props) => {
  const { className, kind, ...restProps } = props;
  return <Box className={cx(css.root, className, css[kind])} outline {...restProps} />;
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
