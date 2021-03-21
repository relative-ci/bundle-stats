import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Icon } from '../icon';
import css from './dropdown.module.css';

const ALIGN_LEFT = 'left';
const ALIGN_RIGHT = 'right';

export const Dropdown = (props) => {
  const { className, label, glyph, activeLabel, open, dropdownToggle, align, children } = props;
  const rootClassName = cx(
    css.root,
    open && css.open,
    activeLabel && css.activeLabel,
    css[align],
    className,
  );

  return (
    <div className={rootClassName}>
      <button className={css.label} type="button" onClick={dropdownToggle}>
        {glyph && <Icon className={css.labelIcon} glyph={glyph} />}
        {label}
      </button>
      <div className={css.dropdown}>
        {typeof children === 'function' ? children({ dropdownToggle }) : children}
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  className: '',
  label: '',
  glyph: null,
  align: ALIGN_LEFT,
  activeLabel: false,
};

Dropdown.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Button label */
  label: PropTypes.string,

  /** Icon glyph */
  glyph: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Dropdown open state */
  open: PropTypes.bool.isRequired,

  /** Align modifier */
  align: PropTypes.oneOf([ALIGN_LEFT, ALIGN_RIGHT]),

  /** Active label flag */
  activeLabel: PropTypes.bool,

  /** Content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]).isRequired,

  /** Dropdown toggle handler */
  dropdownToggle: PropTypes.func.isRequired,
};
