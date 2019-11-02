import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Box } from '../../ui/box';
import { SummaryItem } from '../summary-item';
import css from './jobs-header.module.css';

const TOTAL_BUNDLE_SIZE = 'webpack.assets.totalSizeByTypeALL';

export const JobsHeader = (props) => {
  const { className, loading, jobs } = props;

  const rootClassName = cx(css.root, className, loading && css.loading);

  return (
    <Box className={rootClassName}>
      {loading && (
        <>
          <div className={css.job}>
            <div className={css.jobTitle} />

            <SummaryItem
              className={css.jobSummaryItem}
              size="large"
              loading
              id={TOTAL_BUNDLE_SIZE}
            />
          </div>
          <div className={css.job}>
            <div className={css.jobTitle} />

            <SummaryItem
              className={css.jobSummaryItem}
              size="large"
              loading
              id={TOTAL_BUNDLE_SIZE}
            />
          </div>
        </>
      )}

      {!loading && jobs && jobs.map((job, index) => (
        <div className={css.job}>
          <h1 className={css.jobTitle}>
            {`#${job.internalBuildNumber}`}
          </h1>

          <SummaryItem
            className={css.jobSummaryItem}
            size="large"
            loading={false}
            id={TOTAL_BUNDLE_SIZE}
            data={job.summary[TOTAL_BUNDLE_SIZE]}
            showDelta={index + 1 < jobs.length}
          />
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
    summary: PropTypes.shape({
      [PropTypes.string]: PropTypes.shape({
        current: PropTypes.number,
        baseline: PropTypes.number,
      }),
    }),
  })),
};

JobsHeader.defaultProps = {
  className: '',
  loading: false,
  jobs: null,
};
