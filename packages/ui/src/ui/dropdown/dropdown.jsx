import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Menu, MenuButton, MenuItem, useMenuState } from 'ariakit/menu';

import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../icon';
import css from './dropdown.module.css';

export const Dropdown = (props) => {
  const { className, buttonClassName, label, ariaLabel, glyph, children } = props;
  const rootClassName = cx(css.root, className);
  const menuState = useMenuState();

  return (
    <div className={rootClassName}>
      <MenuButton state={menuState} className={cx(css.button, buttonClassName)} tabIndex={null}>
        <FlexStack space="xxxsmall">
          {glyph && <Icon className={css.labelIcon} glyph={glyph} />}
          {label}
        </FlexStack>
      </MenuButton>
      <Menu state={menuState} aria-label={ariaLabel || label} className={css.dropdown}>
        {typeof children === 'function'
          ? children({
              MenuItem,
              menu: menuState,
              menuItemClassName: css.menuItem,
              menuItemActiveClassName: css.menuItemActive,
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

  /** Content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]).isRequired,
};
