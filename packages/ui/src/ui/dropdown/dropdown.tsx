import React from 'react';
import cx from 'classnames';
import { Menu, MenuButton, MenuItem, useMenuState } from 'ariakit/menu';

import { Button, BUTTON_SIZE } from '../button';
import css from './dropdown.module.css';

interface DropdownItemProps {
  isActive?: boolean;
}

export const DropdownItem = (props: DropdownItemProps & React.ComponentProps<typeof MenuItem>) => {
  const { className = '', isActive = false, ...restProps } = props;

  return (
    <MenuItem className={cx(css.item, className, isActive && css.itemActive)} {...restProps} />
  );
};

interface DropdownProps {
  buttonClassName?: string;
  dropdownClassName?: string;
  label?: React.ReactNode;
  ariaLabel?: string;
  glyph?: string;
  disabled?: boolean;
}

export const Dropdown = (props: DropdownProps & React.ComponentProps<'div'>) => {
  const {
    buttonClassName = '',
    dropdownClassName = '',
    label = null,
    ariaLabel = '',
    glyph = '',
    disabled = false,
    children,
  } = props;

  const dropdownAriaLabel = ariaLabel || (typeof label === 'string' ? label : '');
  const menuState = useMenuState();

  return (
    <>
      <MenuButton
        as={Button}
        outline
        size={BUTTON_SIZE.SMALL}
        glyph={glyph}
        disabled={disabled}
        state={menuState}
        tabIndex={null}
        className={cx(css.button, buttonClassName)}
      >
        {label}
      </MenuButton>
      <Menu
        portal
        state={menuState}
        aria-label={dropdownAriaLabel}
        className={cx(css.dropdown, dropdownClassName)}
      >
        {children}
      </Menu>
    </>
  );
};
