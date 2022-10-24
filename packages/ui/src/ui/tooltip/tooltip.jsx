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
    tooltipClassName,
    title,
    children,
    as: Component,
    containerRef: ref,
    darkMode,
    ...restProps
  } = props;

  const tooltip = useTooltipState({ placement: 'top' });

  return (
    <>
      <UITooltipAnchor
        as={Component}
        className={cx(css.root, className)}
        state={tooltip}
        {...(ref ? { ref } : {})}
        {...restProps}
      >
        {children}
      </UITooltipAnchor>
      {title && (
        <UITooltip state={tooltip} className={cx(css.tooltip, tooltipClassName, darkMode && css.tooltipDarkMode)}>
          <UITooltipArrow state={tooltip} className={css.arrow} size={12} />
          {title}
        </UITooltip>
      )}
    </>
  );
};

Tooltip.defaultProps = {
  className: '',
  tooltipClassName: '',
  title: '',
  as: 'span',
  containerRef: null,
  darkMode: true,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  tooltipClassName: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  containerRef: PropTypes.shape({
    current: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
  darkMode: PropTypes.bool,
};
