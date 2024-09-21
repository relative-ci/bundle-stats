import React from 'react';
import cx from 'classnames';
import { Menu, MenuButton, MenuItem, useMenuStore } from '@ariakit/react';

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
}

export const Dropdown = (props: DropdownProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    dropdownClassName = '',
    label = null,
    ariaLabel = '',
    glyph = '',
    disabled = false,
    children,
  } = props;

  const dropdownAriaLabel = ariaLabel || (typeof label === 'string' ? label : '');
  const menu = useMenuStore();

  return (
    <>
      <MenuButton
        store={menu}
        className={cx(css.button, className)}
        render={(menuButtonProps) => (
          <Button
            outline
            size={BUTTON_SIZE.SMALL}
            glyph={glyph}
            disabled={disabled}
            {...menuButtonProps}
          />
        )}
      >
        {label}
      </MenuButton>
      <Menu
        portal
        store={menu}
        aria-label={dropdownAriaLabel}
        className={cx(css.dropdown, dropdownClassName)}
      >
        {children}
      </Menu>
    </>
  );
};
