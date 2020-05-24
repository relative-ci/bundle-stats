import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import * as CONSTANTS from './box.constants';
import css from './box.module.css';

export const Box = ({ className, outline, space, as: Component, ...props }) => {
  const rootClassName = cx(css.root, className, outline && css.outline, space && css[space]);
  return <Component className={rootClassName} {...props} />;
};

Box.defaultProps = {
  className: '',
  outline: false,
  space: CONSTANTS.BOX_SPACE_MEDIUM,
  as: 'div',
};

Box.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Outline flag */
  outline: PropTypes.bool,

  /** Inner space modifier */
  space: PropTypes.oneOf(CONSTANTS.BOX_SPACES),

  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};
