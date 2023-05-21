import React, { useMemo } from 'react';
import cx from 'classnames';
import {
  Hovercard,
  HovercardAnchor,
  HovercardArrow,
  useHovercard,
  useHovercardState,
} from 'ariakit/hovercard';

import css from './hover-card.module.css';

export interface HoverCardProps {
  className?: string;
  anchorClassName?: string;
  hoverCardClassName?: string;
  href?: string;
  as?: React.ElementType;
  label: React.ReactNode;
  children?: React.ReactNode | (({ close }: { close: () => void }) => React.ReactNode);
}

export const HoverCard = (props: HoverCardProps) => {
  const {
    className = '',
    anchorClassName = '',
    hoverCardClassName = '',
    href = '',
    as = null,
    label,
    children,
  } = props;

  const state = useHovercardState({ gutter: 8, timeout: 800 });
  const hovercardProps = useHovercard({ state, portal: true });

  // Fallback to span if no href
  const Component = useMemo(() => {
    if (as) {
      return as;
    }

    if (href) {
      return 'a';
    }

    return 'span';
  }, [as, href]);

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
        {...hovercardProps}
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
