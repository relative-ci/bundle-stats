import React, { ComponentProps } from 'react';
import cx from 'classnames';
import { Menu, MenuButton, MenuItem, MenuStateProps, useMenuState } from 'ariakit/menu';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

import { Button, BUTTON_SIZE } from '../button';
import css from './dropdown.module.css';
import { Icon } from '../icon';

export type DropdownGroupProps = ComponentProps<'div'>;

export const DropdownGroup = (props: DropdownGroupProps) => {
  const { className, ...restProps } = props;
  return <div className={cx(css.group, className)} {...restProps} />;
};

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
  showChevron?: boolean;
}

export const Dropdown = (props: DropdownProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    dropdownClassName = '',
    label = null,
    ariaLabel = '',
    glyph = '',
    showChevron: initialShowChevron,
    disabled = false,
    placement,
    gutter = 4,
    shift,
    children,
  } = props;

  const dropdownAriaLabel = ariaLabel || (typeof label === 'string' ? label : '');
  const menuState = useMenuState({ animated: true, placement, gutter, shift });
  const showChevron = isUndefined(initialShowChevron) ? !isNull(label) : initialShowChevron;

  return (
    <>
      <MenuButton
        as={Button}
        outline
        size={BUTTON_SIZE.SMALL}
        glyph={glyph}
        rightGlyph={showChevron ? Icon.ICONS.CHEVRON_DOWN : undefined}
        disabled={disabled}
        state={menuState}
        toggleOnClick
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
