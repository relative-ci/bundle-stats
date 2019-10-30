import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './tooltip.module.css';

export const Tooltip = (props) => {
  const {
    className,
    title,
    children,
    as: Component,
    align,
    containerRef: ref,
    ...restProps
  } = props;

  const rootClassName = cx(css.root, className, align && css[align]);

  return (
    <Component
      className={rootClassName}
      {...ref ? { ref } : {}}
      {...restProps}
    >
      {children}
      <div className={css.tooltip}>
        {title}
        <span className={css.tooltipArrow} />
      </div>
    </Component>
  );
};

Tooltip.defaultProps = {
  className: '',
  as: 'span',
  align: '',
  containerRef: null,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  align: PropTypes.oneOf(['', 'topLeft']),
  containerRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};
