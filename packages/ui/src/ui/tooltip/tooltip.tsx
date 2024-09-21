import React from 'react';
import cx from 'classnames';
import {
  Tooltip as BaseTooltip,
  TooltipAnchor as BaseTooltipAnchor,
  TooltipArrow as BaseTooltipArrow,
  useTooltipStore,
} from '@ariakit/react';

import css from './tooltip.module.css';

interface TooltipProps<T extends React.ElementType> {
  className?: string;
  tooltipClassName?: string;
  title?: React.ReactNode;
  as?: T;
  containerRef?: React.RefObject<HTMLDivElement>;
  darkMode?: boolean;
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
    darkMode = true,
    ...restProps
  } = props;

  const tooltip = useTooltipStore({ placement: 'top', timeout: 300 });
  const state = tooltip.getState();

  return (
    <>
      <BaseTooltipAnchor
        as={Component as React.ElementType}
        className={cx(css.root, className)}
        store={tooltip}
        aria-controls={state.open ? 'tooltip' : ''}
        {...(ref ? { ref } : {})}
        {...restProps}
      />
      {title && (
        <BaseTooltip
          store={tooltip}
          className={cx(css.tooltip, tooltipClassName, darkMode && css.tooltipDarkMode)}
        >
          <BaseTooltipArrow store={tooltip} className={css.arrow} size={12} />
          {title}
        </BaseTooltip>
      )}
    </>
  );
};
