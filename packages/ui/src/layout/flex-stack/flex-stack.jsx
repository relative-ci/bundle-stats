import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../constants';
import { getRenderChildWithClassName } from '../../utils';
import css from './flex-stack.module.css';

export const FlexStack = ({
  as: Component = 'div',
  className = '',
  space = '',
  inline = false,
  children = null,
  alignItems = '',
  ...restProps
}) => {
  const rootClassName = cx(
    className,
    css.root,
    css[`space--${space}`],
    css[`align-items--${alignItems}`],
    inline && css.inline,
  );

  return (
    <Component {...restProps} className={rootClassName}>
      {React.Children.map(children, getRenderChildWithClassName(css.item))}
    </Component>
  );
};

FlexStack.defaultProps = {
  as: 'div',
  className: '',
  children: null,
  space: NO_SPACE,
  alignItems: undefined,
  inline: false,
};

FlexStack.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  space: PropTypes.oneOf(SPACES),
  alignItems: PropTypes.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'baseline']),
  inline: PropTypes.bool,
};
