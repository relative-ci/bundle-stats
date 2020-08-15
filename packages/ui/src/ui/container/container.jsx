import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './container.module.css';

export const Container = ({ className, as: Component, ...restProps }) => (
  <Component className={cx(css.root, className)}>
    <div className={css.inner} {...restProps} />
  </Component>
);

Container.defaultProps = {
  className: '',
  as: 'div',
};

Container.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Custom component */
  as: PropTypes.elementType,
};
