import React from 'react';
import cx from 'classnames';

import type { TagProps } from '../../ui/tag';
import { Tag } from '../../ui/tag';
import css from './asset-meta-tag.module.css';
import type { ReportMetricAssetRowMetaStatus } from '../../types';

export type AssetMetaTagProps = {
  tag: 'entry' | 'initial' | 'chunk';
  status?: ReportMetricAssetRowMetaStatus | boolean;
} & TagProps;

export const AssetMetaTag = (props: AssetMetaTagProps) => {
  const { className = '', title, tag, status, ...restProps } = props;

  const rootClassName = cx(
    css.root,
    status === 'added' && css.added,
    status === 'removed' && css.removed,
    css[tag],
    className,
  );

  return (
    <Tag
      className={rootClassName}
      title={title}
      size={Tag.SIZES.SMALL}
      kind={Tag.KINDS.INFO}
      {...restProps}
    />
  );
};
