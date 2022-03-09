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
  const { className, href, as, label, children } = props;
  const state = useHovercardState({ gutter: 8 });
  const hoverCardProps = useHovercard({ state, portal: true });

  // Fallback to span if no href
  const Component = resolveComponent(as, href);

  const handleOnClose = useCallback(
    (event) => {
      state.hide();
      event.preventDefault();
    },
    [state],
  );

  return (
    <div className={cx(css.root, className)}>
      <HovercardAnchor state={state} href={href} className={css.anchor} as={Component}>
        {label}
      </HovercardAnchor>
      <Hovercard
        {...hoverCardProps}
        state={state}
        className={css.hoverCard}
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
  label: '',
  as: '',
  href: '',
};
