import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import css from './input.module.css';

export const Input = ({ className, size, ...restProps }) => {
  const rootClassName = cx(css.root, className, css[size]);
  return <input className={rootClassName} {...restProps} />;
};

Input.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Input.defaultProps = {
  className: '',
  size: 'medium',
};
