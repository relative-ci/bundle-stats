import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './delta.module.css';

export const Delta = ({ className, displayValue, deltaType, inverted }) => {
  const rootClassName = cx(css.root, className, inverted && css.inverted, css[deltaType]);
  return <span className={rootClassName}>{displayValue}</span>;
};

Delta.defaultProps = {
  className: '',
  inverted: false,
};

Delta.propTypes = {
  className: PropTypes.string,
  displayValue: PropTypes.string.isRequired,
  deltaType: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
};
