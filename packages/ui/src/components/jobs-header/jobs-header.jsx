import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import I18N from '../../i18n';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { JobHeader } from '../job-header';
import css from './jobs-header.module.css';

export const JobsHeader = (props) => {
  const { className, jobs } = props;
  const rootClassName = cx(css.root, className);

  return (
    <FlexStack className={rootClassName} space="small">
      {jobs?.map((job, index) => (
        <Box key={job.internalBuildNumber || index} className={css.item}>
          <JobHeader job={job} tag={index === 0 ? I18N.CURRENT : I18N.BASELINE} />
        </Box>
      ))}
    </FlexStack>
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
