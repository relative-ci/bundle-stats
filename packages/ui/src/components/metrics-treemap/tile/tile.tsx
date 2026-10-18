import React, { type ComponentProps, type MouseEventHandler, useCallback, useMemo } from 'react';
import cx from 'classnames';
import type { MetricRunInfo, ReportMetricRow } from '@bundle-stats/utils';

import { FlexStack } from '../../../layout/flex-stack';
import { Delta } from '../../delta';
import { type TreeLeaf, PADDING_INNER, TileSizeDisplay } from '../metrics-treemap.constants';
import * as I18N from '../metrics-treemap.i18n';
import { resolveTileSizeDisplay } from '../metrics-treemap.utils';
import css from './tile.module.css';

interface TileContentProps {
  /**
   * Node label
   */
  label: string;
  /**
   * Tile id - metric label or basename for grouped tiles
   */
  item: ReportMetricRow;
  /**
   * The estimated size of the tile
   */
  sizeDisplay: TileSizeDisplay;
  /**
   * Metric run info
   */
  runInfo: MetricRunInfo;
}

const TileContentContainer = (props: ComponentProps<'div'>) => (
  <FlexStack
    direction="column"
    justifyContent="center"
    gap="xxxsmall"
    className={css.tileContent}
    {...props}
  />
);

const TileContent = (props: TileContentProps) => {
  const { label, sizeDisplay, item, runInfo } = props;

  // Render only the container
  if (sizeDisplay === 'minimal') {
    return <TileContentContainer />;
  }

  const resolvedLabel = label || item.label;

  // Render only the label
  if (sizeDisplay === 'small') {
    return (
      <TileContentContainer>
        <p className={css.tileContentLabel}>{resolvedLabel}</p>
      </TileContentContainer>
    );
  }

  return (
    <TileContentContainer>
      <p className={css.tileContentLabel}>{label || item.label}</p>
      <p className={css.tileContentValue}>
        <span className={css.tileContentMetric}>{runInfo.displayValue}</span>
        <Delta
          className={css.tileContentDelta}
          displayValue={runInfo.displayDeltaPercentage}
          deltaType={runInfo.deltaType}
        />
      </p>
    </TileContentContainer>
  );
};

export interface TileProps {
  left: number;
  top: number;
  width: number;
  height: number;
  data: TreeLeaf;
  onClick?: (id: string) => void;
}

export const Tile = (props: TileProps) => {
  const { left, top, width, height, data, onClick } = props;

  const { item, label } = data;
  const runInfo = item.runs?.[0] as MetricRunInfo;

  const sizeDisplay = useMemo(() => resolveTileSizeDisplay(width, height), [width, height]);
  const handleOnClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      onClick?.(item.key);
    },
    [item.key, onClick],
  );

  const className = cx(
    css.root,
    css[`tile-${runInfo.deltaType}`],
    sizeDisplay === 'small' && css.tileSizeSmall,
    sizeDisplay === 'default' && css.tileSizeDefault,
    left === PADDING_INNER && css.tileFirstCol,
  );

  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */
  return (
    <div
      onClick={handleOnClick}
      role="button"
      aria-label={I18N.TILE_LABEL}
      data-treemap-id={data.id}
      data-treemap-tile
      style={{ left, top, width, height }}
      className={className}
    >
      <TileContent label={label} sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
    </div>
  );
};
