import React from 'react';
import cx from 'classnames';
import {
  Tooltip as UITooltip,
  TooltipAnchor as UITooltipAnchor,
  TooltipArrow as UITooltipArrow,
  useTooltipState,
} from 'ariakit/tooltip';

import css from './tooltip.module.css';

interface TooltipProps<T extends React.ElementType> {
  className?: string;
  tooltipClassName?: string;
  title?: React.ReactNode;
  as?: T;
  containerRef?: React.RefObject<HTMLElement>;
}

export const Tooltip = <T extends React.ElementType = 'span'>(
  props: TooltipProps<T> & Omit<React.ComponentProps<T>, keyof TooltipProps<T>>,
) => {
  const {
    className = '',
    tooltipClassName = '',
    title = '',
    as: Component = 'span',
    containerRef: ref,
    ...restProps
  } = props;

  const tooltip = useTooltipState({ placement: 'top', timeout: 300 });

  return (
    <>
      <UITooltipAnchor
        as={Component as React.ElementType}
        className={cx(css.root, className)}
        state={tooltip}
        aria-controls={tooltip.open ? tooltip.contentElement?.id : ''}
        {...(ref ? { ref } : {})}
        {...restProps}
      />
      {title && (
        <UITooltip state={tooltip} className={cx(css.tooltip, tooltipClassName)}>
          <UITooltipArrow state={tooltip} className={css.arrow} size={12} />
          {title}
        </UITooltip>
      )}
    </>
  );
};
