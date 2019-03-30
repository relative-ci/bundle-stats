import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './tabs.css';

const cloneElement = (element) => {
  const { className, isActive, ...restProps } = element.props;

  return React.cloneElement(
    element,
    {
      ...restProps,
      className: cx(css.item, isActive && css.itemActive, className),
    },
  );
};

export const Tabs = ({ className, children }) => (
  <nav className={cx(css.root, className)}>
    {React.Children.map(children, cloneElement)}
  </nav>
);

Tabs.defaultProps = {
  className: '',
};

Tabs.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Component children */
  children: PropTypes.node.isRequired,
};
