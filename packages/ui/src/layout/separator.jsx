import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './separator.module.css';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

/**
 * @param {PropTypes.InferProps<typeof propTypes>} props
 * @return {React.FunctionComponentElement}
 */
export const Separator = (props) => {
  const { className, ...restProps } = props;
  return <div className={cx(css.root, className)} {...restProps} />;
};

Separator.propTypes = propTypes;
Separator.defaultProps = defaultProps;
