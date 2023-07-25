import React, { useMemo } from 'react';
import cx from 'classnames';
import {
  Hovercard as BaseHoverCard,
  HovercardAnchor as BaseHoverCardAnchor,
  HovercardArrow as BaseHoverCardArrow,
  useHovercardStore,
} from '@ariakit/react';

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

  const hovercard = useHovercardStore({ timeout: 800, placement: 'top' });
  const state = hovercard.getState();

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
      <BaseHoverCardAnchor
        store={hovercard}
        href={href}
        className={cx(css.anchor, anchorClassName)}
        aria-controls={state.open ? 'hovercard' : ''}
      >
        <Component>{label}</Component>
      </BaseHoverCardAnchor>
      <BaseHoverCard store={hovercard} portal className={cx(css.hoverCard, hoverCardClassName)}>
        <BaseHoverCardArrow size={24} />
        {typeof children === 'function' ? children({ close: hovercard.hide }) : children}
      </BaseHoverCard>
    </div>
  );
};
