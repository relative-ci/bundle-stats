import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './file-name.module.css';

export const FileName = ({ className, as: Component, name }) => (
  <Component className={cx(css.root, className)}>
    {name}
  </Component>
);

FileName.defaultProps = {
  className: '',
  as: 'span',
  name: '',
};

FileName.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Element type */
  as: PropTypes.elementType,

  /** File name source  */
  name: PropTypes.string,
};
