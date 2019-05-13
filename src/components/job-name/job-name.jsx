import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from '../../ui';
import css from './job-name.module.css';

const JobNameLabel = ({ internalBuildNumber, labelProps }) => (
  <React.Fragment>
    <span {...labelProps}>
      Job
    </span>
    <span>
      {`#${internalBuildNumber}`}
    </span>
  </React.Fragment>
);

JobNameLabel.defaultProps = {
  labelProps: {},
};

JobNameLabel.propTypes = {
  internalBuildNumber: PropTypes.number.isRequired,
  labelProps: PropTypes.shape({
    className: PropTypes.string,
  }),
};

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
    {render({
      internalBuildNumber,
      labelProps: {
        className: css.label,
      },
    })}
  </Tooltip>
);

JobName.defaultProps = {
  as: 'span',
  title: '',
  render: JobNameLabel,
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
