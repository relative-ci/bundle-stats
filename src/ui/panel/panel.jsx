import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './panel.module.css';

export const Panel = ({ className, as: Component, ...restProps }) => (
  <Component
    className={cx(css.root, className)}
    {...restProps}
  />
);

Panel.defaultProps = {
  className: '',
  as: 'div',
};

Panel.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};
