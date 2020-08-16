import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './stack.module.css';

const NO_SPACE = 'no-space';
const SPACE_XXXSMALL = 'xxxsmall';
const SPACE_XXSMALL = 'xxsmall';
const SPACE_XSMALL = 'xsmall';
const SPACE_SMALL = 'small';
const SPACE_MEDIUM = 'medium';
const SPACE_LARGE = 'large';
const SPACE_XLARGE = 'xlarge';
const SPACE_XXLARGE = 'xxlarge';
const SPACE_XXXLARGE = 'xxxlarge';

const SPACES = [
  NO_SPACE,
  SPACE_XXXSMALL,
  SPACE_XXSMALL,
  SPACE_XSMALL,
  SPACE_SMALL,
  SPACE_MEDIUM,
  SPACE_LARGE,
  SPACE_XLARGE,
  SPACE_XXLARGE,
  SPACE_XXXLARGE,
];

export const Stack = (props) => {
  const { as: Component, className, space, children } = props;
  const rootClassName = cx(className, css.root, css[`space--${space}`]);

  return (
    <Component className={rootClassName}>
      {React.Children.map(
        children,
        (child) => child !== null && <div className={css.item}>{child}</div>,
      )}
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
