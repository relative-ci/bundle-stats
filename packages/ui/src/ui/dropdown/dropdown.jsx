import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Menu, MenuButton, MenuItem, useMenuStore } from '@ariakit/react';

import { Button, BUTTON_SIZE } from '../button';
import css from './dropdown.module.css';

const Item = ({ className = '', isActive = false, ...restProps }) => (
  <MenuItem className={cx(css.item, className, isActive && css.itemActive)} {...restProps} />
);

Item.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

Item.defaultProps = {
  className: '',
  isActive: false,
};

export const Dropdown = (props) => {
  const { className, buttonClassName, label, ariaLabel, glyph, disabled, children } = props;
  const rootClassName = cx(css.root, className);
  const menu = useMenuStore();

  return (
    <div className={rootClassName}>
      <MenuButton
        as={Button}
        outline
        size={BUTTON_SIZE.SMALL}
        glyph={glyph}
        disabled={disabled}
        store={menu}
        tabIndex={null}
        className={cx(css.button, buttonClassName)}
      >
        {label}
      </MenuButton>
      <Menu store={menu} aria-label={ariaLabel || label} className={css.dropdown}>
        {typeof children === 'function'
          ? children({
              MenuItem: Item,
              menu,
              menuItemClassName: css.item,
              menuItemActiveClassName: css.itemActive,
            })
          : children}
      </Menu>
    </div>
  );
};

Dropdown.defaultProps = {
  className: '',
  buttonClassName: '',
  label: null,
  ariaLabel: '',
  glyph: null,
  disabled: false,
};

Dropdown.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Button adopted child class name */
  buttonClassName: PropTypes.string,

  /** Button label */
  label: PropTypes.node,

  /** Aria label */
  ariaLabel: PropTypes.string,

  /** Icon glyph */
  glyph: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Dropdown button disabled attribute */
  disabled: PropTypes.bool,

  /** Content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]).isRequired,
};

Dropdown.Item = Item;
