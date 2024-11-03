import React, { ElementType } from 'react';
import cx from 'classnames';

import type { TagProps } from '../../ui/tag';
import { Icon } from '../../ui/icon';
import { FileName } from '../../ui/file-name';
import { HoverCard } from '../../ui/hover-card';
import { Tag } from '../../ui/tag';
import { AssetNotPredictive } from '../asset-not-predictive';

import css from './asset-name.module.css';
import { ReportMetricAssetRow, ReportMetricAssetRowMetaStatus } from '../../types';

const RUN_TITLE_CURRENT = 'Current';
const RUN_TITLE_BASELINE = 'Baseline';
const RUNS_LABELS = [RUN_TITLE_CURRENT, RUN_TITLE_BASELINE];

type MetaTagProps = { status: ReportMetricAssetRowMetaStatus | boolean } & TagProps;

const MetaTag = (props: MetaTagProps) => {
  const { className = '', title, status } = props;

  const rootClassName = cx(
    css.metaTag,
    status === 'added' && css.metaTagAdded,
    status === 'removed' && css.metaTagRemoved,
    className,
  );

  return (
    <Tag className={rootClassName} title={title} size={Tag.SIZES.SMALL} kind={Tag.KINDS.INFO} />
  );
};

export type AssetNameProps = {
  className?: string;
  row: ReportMetricAssetRow;
  customComponentLink: ElementType;
};

export const AssetName = (props: AssetNameProps) => {
  const { className = '', customComponentLink: CustomComponentLink, row } = props;
  const { label, isNotPredictive, runs, isChunk, isEntry, isInitial } = row;

  return (
    <span className={cx(css.root, className)}>
      {isNotPredictive && (
        <HoverCard
          label={<Icon className={css.notPredictiveIcon} glyph={Icon.ICONS.WARNING} />}
          className={css.notPredictive}
          anchorClassName={css.notPredictiveAnchor}
        >
          <AssetNotPredictive runs={runs} labels={RUNS_LABELS} />
        </HoverCard>
      )}

      <CustomComponentLink entryId={row.key} className={css.name}>
        <span className={css.metaTags}>
          {isEntry && <MetaTag className={css.metaTagEntry} title="Entrypoint" status={isEntry} />}
          {isInitial && (
            <MetaTag className={css.metaTagInitial} title="Initial" status={isInitial} />
          )}
          {isChunk && <MetaTag className={css.metaTagChunk} title="Chunk" status={isChunk} />}
        </span>
        <FileName className={css.nameText} name={label} />
      </CustomComponentLink>
    </span>
  );
};
