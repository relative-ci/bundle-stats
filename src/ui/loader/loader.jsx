import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './loader.module.css';

export const Loader = ({ className }) => (
  <span className={cx(css.root, className)}>
    <span className={css.loader} />
  </span>
);

Loader.defaultProps = {
  className: '',
};

Loader.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};
