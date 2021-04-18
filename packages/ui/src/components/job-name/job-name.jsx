import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from '../../ui/tooltip';
import css from './job-name.module.css';

export const JobName = ({ as: Component, title, internalBuildNumber, children, ...restProps }) => (
  <Tooltip className={css.root} as={Component} title={title} {...restProps}>
    {children || `Job #${internalBuildNumber}`}
  </Tooltip>
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
