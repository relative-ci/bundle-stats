import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  usePopoverState,
  Popover as UIPopover,
  PopoverDisclosure as UIPopoverDisclosure,
  PopoverArrow as UIPopoverArrow,
} from 'reakit/Popover';

import { Icon } from '../icon';
import css from './popover.module.css';

export const Popover = ({ className, icon, label, ariaLabel, children }) => {
  const popover = usePopoverState({
    baseId: process.env.NODE_ENV === 'test' && 'id-test',
    gutter: 24,
    modal: true,
    placement: 'top',
  });

  const onCloseButtonClick = useCallback(
    (event) => {
      event.preventDefault();
      popover.toggle();
    },
    [popover],
  );

  const onButtonClick = useCallback(
    (event) => {
      event.preventDefault();
      popover.toggle();
    },
    [popover]
  );

  return (
    <>
      <UIPopoverDisclosure
        className={cx(css.button, className)}
        {...popover}
        onClick={onButtonClick}
        aria-label={ariaLabel}
      >
        {icon && (typeof icon === 'string' ? <Icon className={css.icon} glyph={icon} /> : icon)}
        {label && <span className={css.label}>{label}</span>}
      </UIPopoverDisclosure>
      <UIPopover className={css.popover} {...popover} tabIndex={0}>
        <UIPopoverArrow className={css.arrow} {...popover} />

        {typeof children === 'function' ? children({ popoverToggle: popover.toggle }) : children}

        <Icon
          glyph="close"
          as="button"
          type="button"
          className={css.closeBtn}
          onClick={onCloseButtonClick}
        />
      </UIPopover>
    </>
  );
};

Popover.propTypes = {
  className: PropTypes.string,
  label: PropTypes.element,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]).isRequired,
  ariaLabel: PropTypes.string,
};

Popover.defaultProps = {
  className: '',
  icon: '',
  label: '',
  ariaLabel: 'View more info',
};
