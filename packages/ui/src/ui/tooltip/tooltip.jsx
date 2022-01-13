import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as BaseTooltip from '@radix-ui/react-tooltip';

import css from './tooltip.module.css';

const OFFSET = 9;
const DELAY = 200;

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

  const rootClassName = cx(css.root, className);
  const tooltipClassName = cx(css.tooltip, darkMode && css.tooltipDarkMode);

  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root delayDuration={DELAY}>
        <BaseTooltip.Trigger asChild>
          <Component className={rootClassName} {...restProps}>
            {children}
          </Component>
        </BaseTooltip.Trigger>
        {title && (
          <BaseTooltip.Content className={tooltipClassName}>
            <BaseTooltip.Arrow className={css.arrow} startOffset={OFFSET} offset={OFFSET} />
            {title}
          </BaseTooltip.Content>
        )}
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
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
