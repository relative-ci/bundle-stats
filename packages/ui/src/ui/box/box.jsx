import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './box.module.css';

export const Box = ({ className, outline, as: Component, ...props }) => {
  const rootClassName = cx(css.root, className, outline && css.outline);
  return <Component className={rootClassName} {...props} />;
};

Box.defaultProps = {
  className: '',
  outline: false,
  as: 'div',
};

Box.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Outline flag */
  outline: PropTypes.bool,

  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};
