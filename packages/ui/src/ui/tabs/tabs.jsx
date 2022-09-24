import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './tabs.module.css';

const Item = ({ isTabActive, as: Component, className,...restProps }) => (
  <Component className={cx(css.item, className, isTabActive && css.itemActive)} {...restProps} />
);

Item.defaultProps = {
  isTabActive: false,
  className: '',
  as: 'span',
};

Item.propTypes = {
  isTabActive: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export const Tabs = ({ className, ...restProps }) => (
  <nav className={cx(css.root, className)} {...restProps} />
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

Tabs.Item = Item;
