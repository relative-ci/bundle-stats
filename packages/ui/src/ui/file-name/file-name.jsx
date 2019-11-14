import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './file-name.css';

export const FileName = ({ className, name }) => (
  <span className={cx(css.root, className)}>
    {name}
  </span>
);

FileName.defaultProps = {
  className: '',
  name: '',
};

FileName.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** File name source  */
  name: PropTypes.string,
};
