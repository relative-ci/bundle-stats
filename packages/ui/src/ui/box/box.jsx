import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './box.module.css';

export const Box = ({
  className,
  as: Component,
  ...props
}) => {
  const rootClassName = cx(css.root, className);

  return (
    <Component
      className={rootClassName}
      {...props}
    />
  );
};

Box.defaultProps = {
  className: '',
  as: 'div',
};

Box.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
};
