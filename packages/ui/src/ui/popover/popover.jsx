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

export const Popover = ({ className, content, children }) => {
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
      >
        {children}
      </UIPopoverDisclosure>
      <UIPopover className={css.popover} {...popover} tabIndex={0}>
        <UIPopoverArrow className={css.arrow} {...popover} />
        {content}

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
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

Popover.defaultProps = {
  className: '',
};
