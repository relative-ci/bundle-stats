import React, { ElementType } from 'react';
import cx from 'classnames';

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
    <span className={cx(css.root, className)}>
      {isNotPredictive && (
        <HoverCard
          label={<Icon className={css.notPredictiveIcon} glyph={Icon.ICONS.WARNING} />}
          className={css.notPredictive}
          hoverCardClassName={css.notPredictiveHoverCard}
        >
          <AssetNotPredictive runs={runs} labels={RUNS_LABELS} />
        </HoverCard>
      )}

      <EntryComponentLink entryId={row.key} className={css.link}>
        <span className={css.tags}>
          {isEntry && (
            <AssetMetaTag className={css.tag} title="Entrypoint" tag="entry" status={isEntry} />
          )}
          {isInitial && (
            <AssetMetaTag className={css.tag} title="Initial" tag="initial" status={isInitial} />
          )}
          {isChunk && (
            <AssetMetaTag className={css.tag} title="Chunk" tag="chunk" status={isChunk} />
          )}
        </span>
        <FileName className={css.name} name={label} />
      </EntryComponentLink>
    </span>
  );
};
