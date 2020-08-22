import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../constants';
import { getRenderChildWithClassName } from '../../utils';
import css from './flex-stack.module.css';

export const FlexStack = (props) => {
  const { as: Component, className, space, children, ...restProps } = props;
  const rootClassName = cx(className, css.root, css[`space--${space}`]);

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
};

FlexStack.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  space: PropTypes.oneOf(SPACES),
};
