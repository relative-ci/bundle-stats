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
    ...restProps
  } = props;

  const rootClassName = cx(css.root, className, align && css[align]);

  return (
    <Component className={rootClassName} {...restProps}>
      {children}
      <div className={css.tooltip}>
        {title}
      </div>
    </Component>
  );
};

Tooltip.defaultProps = {
  className: '',
  as: 'span',
  align: '',
};

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  align: PropTypes.oneOf(['', 'topLeft']),
};
