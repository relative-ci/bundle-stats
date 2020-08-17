import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../constants';
import { getRenderChildWithClassName } from '../../utils';
import css from './stack.module.css';

export const Stack = (props) => {
  const { as: Component, className, space, children } = props;
  const rootClassName = cx(className, css.root, css[`space--${space}`]);

  return (
    <Component className={rootClassName}>
      {React.Children.map(children, getRenderChildWithClassName(css.item))}
    </Component>
  );
};

Stack.defaultProps = {
  as: 'div',
  className: '',
  children: null,
  space: NO_SPACE,
};

Stack.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
  space: PropTypes.oneOf(SPACES),
};
