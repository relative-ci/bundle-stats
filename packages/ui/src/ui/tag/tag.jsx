import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './tag.module.css';

export const KINDS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
};

export const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export const Tag = (props) => {
  const {
    className = '',
    as: Component = 'span',
    kind = KINDS.DEFAULT,
    size = SIZES.MEDIUM,
    ...restProps
  } = props;
  const rootClassName = cx(css.root, className, css[kind], css[size]);

  return <Component className={rootClassName} {...restProps} />;
};

Tag.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
  kind: PropTypes.oneOf(Object.values(KINDS)),
  size: PropTypes.oneOf(Object.values(SIZES)),
};

Tag.defaultProps = {
  className: '',
  as: 'span',
  kind: KINDS.DEFAULT,
  size: SIZES.MEDIUM,
};

Tag.KINDS = KINDS;
Tag.SIZES = SIZES;
