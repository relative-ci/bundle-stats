import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './delta.module.css';

export const Delta = ({ className, displayValue, deltaType }) => {
  const rootClassName = cx(css.root, className, css[deltaType]);
  return <span className={rootClassName}>{displayValue}</span>;
};

Delta.defaultProps = {
  className: '',
};

Delta.propTypes = {
  className: PropTypes.string,
  displayValue: PropTypes.string.isRequired,
  deltaType: PropTypes.string.isRequired,
};
