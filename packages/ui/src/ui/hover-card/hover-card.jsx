import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Hovercard,
  HovercardAnchor,
  HovercardArrow,
  useHovercard,
  useHovercardState,
} from 'ariakit/hovercard';

import css from './hover-card.module.css';

const resolveComponent = (as, href) => {
  if (as) {
    return as;
  }

  if (href) {
    return 'a';
  }

  return 'span';
};

export const HoverCard = (props) => {
  const { className, anchorClassName, hoverCardClassName, href, as, label, children } = props;
  const state = useHovercardState({ gutter: 8, timeout: 700 });
  const hoverCardProps = useHovercard({ state, portal: true });

  // Fallback to span if no href
  const Component = resolveComponent(as, href);

  return (
    <div className={cx(css.root, className)}>
      <HovercardAnchor
        state={state}
        href={href}
        className={cx(css.anchor, anchorClassName)}
        as={Component}
      >
        {label}
      </HovercardAnchor>
      <Hovercard
        {...hoverCardProps}
        state={state}
        className={cx(css.hoverCard, hoverCardClassName)}
        style={{ zIndex: 10000 }}
      >
        <HovercardArrow size={24} />
        {typeof children === 'function' ? children({ close: state.hide }) : children}
      </Hovercard>
    </div>
  );
};

HoverCard.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
  /** Adopted child class name for hover card */
  hoverCardClassName: PropTypes.string,
  /** Adopted child class name for anchor */
  anchorClassName: PropTypes.string,
  /** Anchor label */
  label: PropTypes.node,
  /** Anchor href */
  href: PropTypes.string,
  /** Anchor component */
  as: PropTypes.elementType,
  /** Hover card component */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

HoverCard.defaultProps = {
  className: '',
  hoverCardClassName: '',
  anchorClassName: '',
  label: '',
  as: '',
  href: '',
};
