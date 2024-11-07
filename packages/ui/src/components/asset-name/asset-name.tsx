import React, { ElementType } from 'react';

import { Icon } from '../../ui/icon';
import { FileName } from '../../ui/file-name';
import { HoverCard } from '../../ui/hover-card';
import { AssetNotPredictive } from '../asset-not-predictive';

import type { ReportMetricAssetRow } from '../../types';
import { AssetMetaTag } from '../asset-meta-tag';
import css from './asset-name.module.css';

const RUN_TITLE_CURRENT = 'Current';
const RUN_TITLE_BASELINE = 'Baseline';
const RUNS_LABELS = [RUN_TITLE_CURRENT, RUN_TITLE_BASELINE];

export type AssetNameProps = {
  className?: string;
  row: ReportMetricAssetRow;
  EntryComponentLink: ElementType;
};

export const AssetName = (props: AssetNameProps) => {
  const { className = '', EntryComponentLink, row } = props;
  const { label, isNotPredictive, runs, isChunk, isEntry, isInitial } = row;

  return (
    <span className={className}>
      {isNotPredictive && (
        <HoverCard
          label={<Icon className={css.notPredictiveIcon} glyph={Icon.ICONS.WARNING} />}
          className={css.notPredictive}
          hoverCardClassName={css.notPredictiveHoverCard}
        >
          <AssetNotPredictive runs={runs} labels={RUNS_LABELS} />
        </HoverCard>
      )}

      <EntryComponentLink entryId={row.key} className={css.name}>
        <span className={css.metaTags}>
          {isEntry && (
            <AssetMetaTag className={css.metaTag} title="Entrypoint" tag="entry" status={isEntry} />
          )}
          {isInitial && (
            <AssetMetaTag
              className={css.metaTag}
              title="Initial"
              tag="initial"
              status={isInitial}
            />
          )}
          {isChunk && (
            <AssetMetaTag className={css.metaTag} title="Chunk" tag="chunk" status={isChunk} />
          )}
        </span>
        <FileName className={css.nameText} name={label} />
      </EntryComponentLink>
    </span>
  );
};
