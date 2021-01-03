import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';
import { formatDistanceToNow } from 'date-fns';
import { SOURCE_PATH_WEBPACK_STATS, formatDate, formatTime } from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Icon } from '../../ui/icon';
import css from './job-header.module.css';

export const JobHeader = (props) => {
  const { className, tag, job, children } = props;

  const { builtAt, hash } = get(job, `meta.${SOURCE_PATH_WEBPACK_STATS}`, {});
  const rootClassName = cx(css.root, className);

  return (
    <Stack className={rootClassName} space="xxsmall">
      <h1 className={css.title}>
        <span>{`#${job.internalBuildNumber}`}</span>
        {tag && <span className={css.tag}>{tag}</span>}
      </h1>
      <FlexStack className={css.meta} space="xxsmall">
        {builtAt && (
          <span className={css.metaItem} title={`${formatDate(builtAt)} ${formatTime(builtAt)}`}>
            <Icon glyph="clock" className={css.metaIcon} />
            <span className={css.metaLabel}>
              {formatDistanceToNow(new Date(builtAt), { addSuffix: true })}
            </span>
          </span>
        )}

        {hash && (
          <span className={css.metaItem} title="Webpack bundle hash">
            <Icon glyph="commit" className={css.metaIcon} />
            <span className={css.metaLabel}>{hash}</span>
          </span>
        )}

        {children}
      </FlexStack>
    </Stack>
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
    summary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }),
  children: PropTypes.element,
};

JobHeader.defaultProps = {
  className: '',
  tag: '',
  job: null,
  children: null,
};
