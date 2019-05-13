import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from '../../ui';
import css from './job-name.module.css';

export const JobName = ({
  as: Component,
  title,
  internalBuildNumber,
  render,
  ...restProps
}) => (
  <Tooltip
    className={css.root}
    as={Component}
    title={title}
    {...restProps}
  >
    {render({ internalBuildNumber })}
  </Tooltip>
);

JobName.defaultProps = {
  as: 'span',
  title: '',
  render: ({ internalBuildNumber }) => `Job #${internalBuildNumber}`,
};

JobName.propTypes = {
  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /** Tooltip title */
  title: PropTypes.string,

  /** Job internal build number */
  internalBuildNumber: PropTypes.number.isRequired,

  /** Render function */
  render: PropTypes.func,
};
