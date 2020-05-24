import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Box } from '../../ui/box';
import { JobHeader } from '../job-header';
import css from './jobs-header.module.css';

export const JobsHeader = (props) => {
  const { className, jobs } = props;
  const rootClassName = cx(css.root, className);

  return (
    <Box className={rootClassName}>
      {jobs &&
        jobs.map((job, index) => (
          <JobHeader
            key={job.internalBuildNumber || index}
            className={css.item}
            job={job}
            tag={index === 0 ? 'current' : 'baseline'}
          />
        ))}
    </Box>
  );
};

JobsHeader.propTypes = {
  /** Adopted child classname */
  className: PropTypes.string,

  /** Jobs data */
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
    }),
  ),
};

JobsHeader.defaultProps = {
  className: '',
  jobs: null,
};
