import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Box } from '../../ui/box';
import css from './jobs-header.module.css';

export const JobsHeader = (props) => {
  const { className, loading, jobs } = props;

  const rootClassName = cx(css.root, className, loading && css.loading);

  return (
    <Box className={rootClassName}>
      {loading && (
        <>
          <div className={css.job}>
            <div className={css.jobTitle} />
          </div>
          <div className={css.job}>
            <div className={css.jobTitle} />
          </div>
        </>
      )}

      {!loading && jobs && jobs.map((job) => (
        <div className={css.job}>
          <h1 className={css.jobTitle}>
            {`#${job.internalBuildNumber}`}
          </h1>
        </div>
      ))}
    </Box>
  );
};

JobsHeader.propTypes = {
  /** Adopted child classname */
  className: PropTypes.string,

  /** Loading flag */
  loading: PropTypes.bool,

  /** Jobs data */
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })),
};

JobsHeader.defaultProps = {
  className: '',
  loading: false,
  jobs: null,
};
