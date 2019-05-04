import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './container.module.css';

export const Container = ({ className, ...restProps }) => (
  <div className={cx(css.root, className)}>
    <div className={css.inner} {...restProps} />
  </div>
);

Container.defaultProps = {
  className: '',
};

Container.propTypes = {
  className: PropTypes.string,
};
