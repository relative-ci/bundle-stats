import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { NO_SPACE, SPACES } from '../../constants';
import css from './box.module.css';

export const Box = (props) => {
  const {
    className,
    as: Component,
    padding,
    horizontalPadding,
    verticalPadding,
    outline,
    ...restProps
  } = props;

  const [resolvedPadding, resolvedVerticalPadding, resolvedHorizontalPadding] = Array.isArray(
    padding,
  )
    ? [null, ...padding]
    : [padding, verticalPadding, horizontalPadding];

  const rootClassName = cx(
    css.root,
    className,
    resolvedPadding && css[`padding-${resolvedPadding}`],
    resolvedVerticalPadding && css[`vertical-padding-${resolvedVerticalPadding}`],
    resolvedHorizontalPadding && css[`horizontal-padding-${resolvedHorizontalPadding}`],
    outline && css.outline,
  );

  return <Component className={rootClassName} {...restProps} />;
};

Box.defaultProps = {
  className: '',
  as: 'div',
  padding: NO_SPACE,
  horizontalPadding: '',
  verticalPadding: '',
  outline: false,
};

Box.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rendered component */
  as: PropTypes.elementType,

  /** Padding space size */
  padding: PropTypes.oneOfType([
    PropTypes.oneOf(SPACES),
    PropTypes.arrayOf(PropTypes.oneOf(SPACES)),
  ]),

  /** Horizonatl padding space size */
  horizontalPadding: PropTypes.oneOf(SPACES),

  /** Vertical padding space size */
  verticalPadding: PropTypes.oneOf(SPACES),

  /** Outline flag */
  outline: PropTypes.bool,
};
