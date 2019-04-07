import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './panels.module.css';

const cloneElement = (element) => {
  const { className, ...restProps } = element.props;

  return React.cloneElement(
    element,
    {
      ...restProps,
      className: cx(css.panel, className),
    },
  );
};

export const Panels = ({ className, children, ...restProps }) => (
  <div
    className={cx(css.root, className)}
    {...restProps}
  >
    {React.Children.map(children, cloneElement)}
  </div>
);

Panels.defaultProps = {
  className: '',
  children: null,
};

Panels.propTypes = {
  /** Adopted child class anme */
  className: PropTypes.string,

  /** Content */
  children: PropTypes.node,
};
