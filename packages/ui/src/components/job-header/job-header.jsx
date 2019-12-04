import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';
import { formatDistanceToNow } from 'date-fns';
import { SOURCE_PATH_WEBPACK_STATS, formatDate, formatTime } from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
import { SummaryItem } from '../summary-item';
import css from './job-header.module.css';

const TOTAL_BUNDLE_SIZE = 'webpack.assets.totalSizeByTypeALL';

export const JobHeader = (props) => {
  const {
    className, job, index, isLast,
  } = props;

  const { builtAt, hash } = get(job, `meta.${SOURCE_PATH_WEBPACK_STATS}`, {});
  const rootClassName = cx(css.root, className);

  return (
    <div className={rootClassName}>
      <div className={css.description}>
        <h1 className={css.title}>
          <span>
            {`#${job.internalBuildNumber}`}
          </span>
          <span className={css.tag}>
            {index === 0 ? 'current' : 'baseline' }
          </span>
        </h1>
        <div className={css.meta}>
          {builtAt && (
            <span
              className={css.metaItem}
              title={`${formatDate(builtAt)} ${formatTime(builtAt)}`}
            >
              <Icon glyph="clock" className={css.metaIcon} />
              <span>
                {formatDistanceToNow(new Date(builtAt), { addSuffix: true })}
              </span>
            </span>
          )}

          {hash && (
            <span className={css.metaItem} title="Webpack bundle hash">
              <Icon glyph="commit" className={css.metaIcon} />
              <span>{hash}</span>
            </span>
          )}
        </div>
      </div>

      <SummaryItem
        className={css.summaryItem}
        size="large"
        loading={false}
        id={TOTAL_BUNDLE_SIZE}
        data={job.summary[TOTAL_BUNDLE_SIZE]}
        showDelta={isLast}
      />
    </div>
  );
};

JobHeader.propTypes = {
  className: PropTypes.string,
  job: PropTypes.shape({
    internalBuildNumber: PropTypes.number,
    meta: PropTypes.shape({
      builtAt: PropTypes.string,
    }),
    summary: PropTypes.object,
  }),
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool,
};

JobHeader.defaultProps = {
  className: '',
  job: null,
  isLast: false,
};
