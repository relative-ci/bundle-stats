import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  useMenuState,
  Menu,
  MenuItem,
  MenuButton,
} from 'reakit/Menu';

import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../icon';
import css from './dropdown.module.css';

export const Dropdown = (props) => {
  const { className, label, ariaLabel, glyph, activeLabel, children } = props;
  const rootClassName = cx(
    css.root,
    activeLabel && css.activeLabel,
    className,
  );

  const menu = useMenuState({
    baseId: process.env.NODE_ENV === 'test' && 'id-test',
    modal: true,
  });

  return (
    <>
      <MenuButton {...menu} className={rootClassName} tabIndex={null}>
        <FlexStack space="xxxsmall" className={css.label}>
          {glyph && <Icon className={css.labelIcon} glyph={glyph} />}
          {label}
        </FlexStack>
      </MenuButton>
      <Menu {...menu} aria-label={ariaLabel || label} className={css.dropdown}>
        {typeof children === 'function' ? children({
          MenuItem,
          menu,
          menuItemClassName: css.menuItem,
        }) : children}
      </Menu>
    </>
  );
};

Dropdown.defaultProps = {
  className: '',
  label: null,
  ariaLabel: '',
  glyph: null,
  activeLabel: false,
};

Dropdown.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Button label */
  label: PropTypes.node,

  /** Aria label */
  ariaLabel: PropTypes.string,

  /** Icon glyph */
  glyph: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Dropdown open state */
  open: PropTypes.bool.isRequired,

  /** Active label flag */
  activeLabel: PropTypes.bool,

  /** Content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]).isRequired,
};
