import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';
import { formatDistanceToNow } from 'date-fns';
import { SOURCE_PATH_WEBPACK_STATS, formatDate, formatTime } from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
import { SummaryItem } from '../summary-item';
import css from './job-header.module.css';

const TOTAL_BUNDLE_SIZE = 'webpack.totalSizeByTypeALL';

export const JobHeader = (props) => {
  const {
    className, tag, job, showSummaryDelta, children,
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
          {tag && (
            <span className={css.tag}>
              {tag}
            </span>
          )}
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

          {children}
        </div>
      </div>

      <SummaryItem
        className={css.summaryItem}
        size="large"
        loading={false}
        id={TOTAL_BUNDLE_SIZE}
        data={get(job.summary, TOTAL_BUNDLE_SIZE)}
        showDelta={showSummaryDelta}
      />
    </div>
  );
};

JobHeader.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  job: PropTypes.shape({
    internalBuildNumber: PropTypes.number,
    meta: PropTypes.shape({
      builtAt: PropTypes.string,
    }),
    summary: PropTypes.object,
  }),
  showSummaryDelta: PropTypes.bool,
  children: PropTypes.element,
};

JobHeader.defaultProps = {
  className: '',
  tag: '',
  job: null,
  showSummaryDelta: true,
  children: null,
};
