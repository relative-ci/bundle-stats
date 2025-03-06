import React from 'react';
import cx from 'classnames';
import { Menu, MenuButton, MenuItem, MenuStateProps, useMenuState } from 'ariakit/menu';

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
  dropdownClassName?: string;
  label?: React.ReactNode;
  ariaLabel?: string;
  glyph?: string;
  disabled?: boolean;
  placement?: MenuStateProps['placement'];
  gutter?: MenuStateProps['gutter'];
  shift?: MenuStateProps['shift'];
}

export const Dropdown = (props: DropdownProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    dropdownClassName = '',
    label = null,
    ariaLabel = '',
    glyph = '',
    disabled = false,
    placement,
    gutter = 4,
    shift,
    children,
  } = props;

  const dropdownAriaLabel = ariaLabel || (typeof label === 'string' ? label : '');
  const menuState = useMenuState({ placement, gutter, shift });

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
        className={cx(css.button, className)}
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
