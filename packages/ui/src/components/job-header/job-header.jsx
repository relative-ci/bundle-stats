import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import { Source, formatDateTime } from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Icon } from '../../ui/icon';
import { Tag } from '../../ui/tag';
import css from './job-header.module.css';

export const JobHeader = (props) => {
  const { className, tag, job, children } = props;

  const { builtAt, hash } = get(job, `meta.${Source.webpack}`, {});
  const rootClassName = cx(css.root, className);

  return (
    <Stack className={rootClassName} space="xxsmall">
      <h1 className={css.title}>
        <span>{`#${job.internalBuildNumber}`}</span>
        {tag && <Tag className={css.tag}>{tag}</Tag>}
      </h1>
      <FlexStack space="xxsmall" className={css.meta}>
        {builtAt && (
          <FlexStack space="xxxsmall" alignItems="center" inline as="span" title={builtAt}>
            <Icon glyph="clock" />
            <span>
              {formatDateTime({ dateStyle: 'medium', timeStyle: 'medium' }, builtAt)}
            </span>
          </FlexStack>
        )}

        {hash && (
          <FlexStack space="xxxsmall" alignItems="center" inline title="Webpack bundle hash">
            <Icon glyph="commit" />
            <span>{hash}</span>
          </FlexStack>
        )}

        <div className={css.content}>{children}</div>
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
