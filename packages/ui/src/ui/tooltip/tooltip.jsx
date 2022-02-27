import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Tooltip as UITooltip,
  TooltipAnchor as UITooltipAnchor,
  TooltipArrow as UITooltipArrow,
  useTooltipState,
} from 'ariakit/tooltip';

import css from './tooltip.module.css';

export const Tooltip = (props) => {
  const {
    className,
    title,
    children,
    as: Component,
    containerRef: ref,
    darkMode,
    ...restProps
  } = props;

  const tooltip = useTooltipState({ placement: 'top' });
  const baseId = process.env.NODE_ENV === 'test' && 'id-test';

  return (
    <>
      <UITooltipAnchor
        as={Component}
        className={cx(css.root, className)}
        state={tooltip}
        {...(ref ? { ref } : {})}
        {...restProps}
        {...(baseId && { id: baseId })}
      >
        {children}
      </UITooltipAnchor>
      {title && (
        <UITooltip
          state={tooltip}
          className={cx(css.tooltip, darkMode && css.tooltipDarkMode)}
          {...(baseId && { id: `${baseId}-tooltip` })}
        >
          <UITooltipArrow state={tooltip} className={css.arrow} size={12} />
          {title}
        </UITooltip>
      )}
    </>
  );
};

Tooltip.defaultProps = {
  className: '',
  title: '',
  as: 'span',
  containerRef: null,
  darkMode: true,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  containerRef: PropTypes.shape({
    current: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
  darkMode: PropTypes.bool,
};
