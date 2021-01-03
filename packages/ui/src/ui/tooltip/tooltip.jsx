import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Tooltip as UITooltip,
  TooltipArrow as UITooltipArrow,
  TooltipReference as UITooltipReference,
  useTooltipState,
} from 'reakit/Tooltip';

import css from './tooltip.module.css';

export const Tooltip = (props) => {
  const {
    className,
    title,
    children,
    as: Component,
    containerRef: ref,
    ...restProps
  } = props;

  const rootClassName = cx(css.root, className);
  const tooltipProps = useTooltipState({
    baseId: process.env.NODE_ENV === 'test' && 'id-test',
    placement: 'top',
  });

  return (
    <>
      <UITooltipReference
        as={Component}
        className={rootClassName}
        {...ref ? { ref } : {}}
        {...restProps}
        {...tooltipProps}
      >
        {children}
      </UITooltipReference>
      {title && (
        <UITooltip {...tooltipProps}>
          <UITooltipArrow {...tooltipProps} className={css.arrow} />
          <div className={css.tooltip}>{title}</div>
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
};

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  containerRef: PropTypes.shape({
    current: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
};
