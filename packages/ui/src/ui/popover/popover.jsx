import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  usePopoverState,
  Popover as UIPopover,
  PopoverDisclosure as UIPopoverDisclosure,
  PopoverArrow as UIPopoverArrow,
} from 'reakit/Popover';

import css from './popover.module.css';

export const Popover = ({ className, content, children }) => {
  const popover = usePopoverState({
    baseId: process.env.NODE_ENV === 'test' && 'id-test',
    gutter: 24,
    placement: 'top',
  });

  return (
    <>
      <UIPopoverDisclosure className={cx(css.button, className)} {...popover}>
        {children}
      </UIPopoverDisclosure>
      <UIPopover className={css.popover} {...popover}>
        <UIPopoverArrow className={css.arrow} {...popover} />
        {content}
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
