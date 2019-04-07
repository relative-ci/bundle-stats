import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './container.module.css';

export const Container = ({ className, ...restProps }) => (
  <div className={cx(css.root, className)} {...restProps} />
);

Container.defaultProps = {
  className: '',
};

Container.propTypes = {
  className: PropTypes.string,
};
