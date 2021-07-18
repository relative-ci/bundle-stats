import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './skeleton.module.css';

export const Skeleton = (props) => {
  const { className, ...restProps } = props;
  const rootClassName = cx(css.root, className);

  return <span className={rootClassName} {...restProps} />;
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  className: '',
};
