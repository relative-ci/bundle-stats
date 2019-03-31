import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './panel.css';

export const Panel = ({ className, ...restProps }) => (
  <div
    className={cx(css.root, className)}
    {...restProps}
  />
);

Panel.defaultProps = {
  className: '',
};

Panel.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};
