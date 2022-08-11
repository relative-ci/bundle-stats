import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './skeleton.module.css';

export const Skeleton = (props) => {
  const { className, as: Component, block, ...restProps } = props;
  const rootClassName = cx(css.root, className, block && css.block);

  return <Component className={rootClassName} {...restProps} />;
};

Skeleton.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
  block: PropTypes.bool,
};

Skeleton.defaultProps = {
  className: '',
  as: 'p',
  block: false,
};
