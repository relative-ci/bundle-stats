import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as BaseDropdownMenu from '@radix-ui/react-dropdown-menu';

import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../icon';
import css from './dropdown.module.css';

export const Dropdown = (props) => {
  const { className, label, ariaLabel, glyph, activeLabel, children } = props;
  const rootClassName = cx(css.root, activeLabel && css.activeLabel, className);

  return (
    <BaseDropdownMenu.Root>
      <BaseDropdownMenu.Trigger className={rootClassName}>
        <FlexStack space="xxxsmall" className={css.label}>
          {glyph && <Icon className={css.labelIcon} glyph={glyph} />}
          {label}
        </FlexStack>
      </BaseDropdownMenu.Trigger>
      <BaseDropdownMenu.Content
        className={css.dropdown}
        aria-label={ariaLabel || label}
        align="start"
      >
        {typeof children === 'function'
          ? children({
              MenuItem: BaseDropdownMenu.Item,
              menuItemClassName: css.menuItem,
              menuItemActiveClassName: css.menuItemActive,
            })
          : children}
      </BaseDropdownMenu.Content>
    </BaseDropdownMenu.Root>
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

  /** Active label flag */
  activeLabel: PropTypes.bool,

  /** Content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]).isRequired,
};
