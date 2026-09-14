import React from 'react';
import PropTypes from 'prop-types';

import css from './job-name.module.css';

export const JobName = ({
  as: Component = 'span',
  title,
  internalBuildNumber,
  children,
  ...restProps
}) => (
  <Component className={css.root} title={title} {...restProps}>
    {children || `Job #${internalBuildNumber}`}
  </Component>
);

JobName.defaultProps = {
  as: 'span',
  title: '',
  internalBuildNumber: null,
  children: null,
};

JobName.propTypes = {
  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /** Tooltip title */
  title: PropTypes.string,

  /** Job internal build number */
  internalBuildNumber: PropTypes.number,

  /** Render function */
  children: PropTypes.node,
};
