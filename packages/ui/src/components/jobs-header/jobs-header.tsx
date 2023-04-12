import React from 'react';
import cx from 'classnames';
import { formatDateTime } from '@bundle-stats/utils';

import I18N from '../../i18n';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Icon } from '../../ui/icon';
import { Tag } from '../../ui/tag';
import css from './jobs-header.module.css';

interface ItemProps {
  job: {
    internalBuildNumber: number;
    meta?: {
      webpack?: {
        builtAt?: string;
        hash?: string;
      };
    };
  };
  tag: string;
}

export const Item = (props: ItemProps & React.ComponentProps<'div'>) => {
  const { className, tag, job } = props;

  const { builtAt, hash } = job.meta?.webpack || {};
  const rootClassName = cx(css.item, className);

  return (
    <Stack className={rootClassName} space="xxsmall">
      <FlexStack space="xsmall" alignItems="center">
        <FlexStack space="xxxsmall" as="h1" className={css.itemTitle}>
          <span>{`#${job.internalBuildNumber}`}</span>
          {tag && <Tag className={css.itemTag}>{tag}</Tag>}
        </FlexStack>

        {builtAt && (
          <FlexStack
            space="xxxsmall"
            alignItems="center"
            inline
            as="span"
            title={builtAt}
            className={css.itemMeta}
          >
            <Icon glyph="clock" className={css.itemMetaIcon} />
            <span className={css.itemMetaText}>
              {formatDateTime({ dateStyle: 'medium', timeStyle: 'medium' }, builtAt)}
            </span>
          </FlexStack>
        )}

        {hash && (
          <FlexStack
            space="xxxsmall"
            alignItems="center"
            inline
            title="Webpack bundle hash"
            className={css.itemMeta}
          >
            <Icon glyph="commit" className={css.itemMetaIcon} />
            <span className={css.itemMetaText}>{hash.slice(0, 7)}</span>
          </FlexStack>
        )}
      </FlexStack>
    </Stack>
  );
};

interface JobsHeaderProps {
  jobs?: Array<ItemProps['job']> | null;
}

export const JobsHeader = (props: JobsHeaderProps & React.ComponentProps<'header'>) => {
  const { className, jobs } = props;
  const rootClassName = cx(css.root, className);

  return (
    <FlexStack className={rootClassName}>
      {jobs?.map((job, index) => (
        <Item
          key={job.internalBuildNumber || index}
          job={job}
          tag={index === 0 ? I18N.CURRENT : I18N.BASELINE}
        />
      ))}
    </FlexStack>
  );
};
