import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './delta.module.css';

const propTypes = {
  className: PropTypes.string,
  displayValue: PropTypes.string.isRequired,
  deltaType: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
};

const defaultProps = {
  className: '',
  inverted: false,
};

/**
 * @param {PropTypes.InferProps<typeof propTypes>} props
 * @return {React.FunctionComponentElement}
 */
export const Delta = (props) => {
  const { className, displayValue, deltaType, inverted } = props;
  const rootClassName = cx(css.root, className, inverted && css.inverted, css[deltaType]);
  return <span className={rootClassName}>{displayValue}</span>;
};

Delta.defaultProps = defaultProps;
Delta.propTypes = propTypes;
