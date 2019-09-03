import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import css from './alert.module.css';

export const Alert = (props) => {
  const { className, kind, children } = props;

  return (
    <div className={cx(css.root, className, css[kind])}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

Alert.defaultProps = {
  className: '',
  kind: 'default',
};
