import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './loader.module.css';

export const Loader = ({ className, size, ...restProps }) => (
  <span className={cx(css.root, className, css[size])} {...restProps} />
);

Loader.SIZE_SMALL = 'small';
Loader.SIZE_MEDIUM = 'medium';
Loader.SIZE_LARGE = 'large';
Loader.SIZES = [Loader.SIZE_SMALL, Loader.SIZE_MEDIUM, Loader.SIZE_LARGE];

Loader.defaultProps = {
  className: '',
  size: Loader.SIZE_MEDIUM,
};

Loader.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Size modifier */
  size: PropTypes.oneOf(Loader.SIZES),
};
