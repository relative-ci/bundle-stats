import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';
import { useMeasure } from 'react-use';
import type { ReportMetricRow, MetricRunInfo, MetricRunInfoBaseline } from '@bundle-stats/utils';
import { hierarchy, treemap, treemapSquarify } from 'd3';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { Tooltip } from '../../ui/tooltip';
import { Delta } from '../delta';
import { RunInfo } from '../run-info';
import css from './metrics-treemap.module.css';

const SQUARIFY_RATIO = 1.78;
const PADDING_OUTER = 0;
const PADDING_INNER = 1;

type TileSizeDisplay = 'minimal' | 'small' | 'default';

/**
 * Resolve the tile size using predefined values to avoid
 * computing the size of the content for every tile
 */
const PADDING_TOP = 4;
const PADDING_BOTTOM = 2; // substracted to allow longer texts to appear
const PADDING_LEFT = 16;
const PADDING_RIGHT = 4; // substracted to allow longer texts to not break
const VERTICAL_SPACING = 4;
const LINE_HEIGHT = 16;
const LINE_HEIGHT_SMALL = 13.3;

function resolveTileSizeDisplay(width: number, height: number): TileSizeDisplay {
  if (
    height > PADDING_TOP + PADDING_BOTTOM + VERTICAL_SPACING + LINE_HEIGHT * 2 &&
    width > PADDING_LEFT + PADDING_RIGHT + 96
  ) {
    return 'default';
  }

  if (
    height > PADDING_TOP + PADDING_BOTTOM + LINE_HEIGHT_SMALL * 2 &&
    width > PADDING_LEFT + PADDING_BOTTOM + 48
  ) {
    return 'small';
  }

  return 'minimal';
}

interface TooltipContentProps {
  data: ReportMetricRow;
}

const TooltipContent = (props: TooltipContentProps) => {
  const { data } = props;
  const currentRun = data.runs[0] as MetricRunInfo;
  const baselineRun = data.runs[data.runs.length - 1] as MetricRunInfoBaseline;

  return (
    <Stack space="small">
      <h3 className={css.tooltipContentTitle}>
        <FileName as="code" name={data.label} />
      </h3>
      <RunInfo
        current={currentRun.displayValue}
        delta={currentRun.displayDeltaPercentage}
        deltaType={currentRun.deltaType}
        baseline={baselineRun?.displayValue || '0B'}
      />
    </Stack>
  );
};

const TileButton = (props: React.ComponentProps<'button'>) => (
  // @ts-expect-error
  <button type="button" xmlns="http://www.w3.org/1999/xhtml" {...props} />
);

interface TreeNode {
  id: string;
  value: number;
  item: ReportMetricRow;
  children?: Array<TreeNode>;
}

interface RootTree {
  id: string;
  value: number;
  children: Array<TreeNode>;
}

interface LeafProps {
  x: number;
  y: number;
  width: number;
  height: number;
  data: TreeNode;
  onClick?: (id: string) => void;
}

const Tile = (props: LeafProps) => {
  const { x, y, width, height, data, onClick } = props;
  const { item } = data;
  const runInfo = item.runs?.[0] as MetricRunInfo;

  const tileSizeDisplay = useMemo(() => resolveTileSizeDisplay(width, height), [width, height]);

  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick(item.key);
    }
  }, [item.key]);

  return (
    <g
      className={cx(
        css.tile,
        !item.changed && css['tile-NO_CHANGE'],
        css[`tile-${runInfo.deltaType}`],
        tileSizeDisplay === 'small' && css.tileSmall,
      )}
    >
      <rect x={x} y={y} width={width} height={height} className={css.tileOverlay} />
      <foreignObject height={height} width={width} x={x} y={y}>
        <Tooltip
          title={<TooltipContent data={item} />}
          tooltipClassName={css.tooltip}
          darkMode={false}
        >
          <TileButton onClick={handleOnClick} className={css.tileContent}>
            {tileSizeDisplay !== 'minimal' && (
              <div className={css.tileContentWrapper}>
                <p className={css.tileContentLabel}>{item.label}</p>
                <p className={css.tileContentValue}>
                  <span className={css.tileContentMetric}>{runInfo.displayValue}</span>
                  <Delta
                    className={css.tileContentDelta}
                    displayValue={runInfo.displayDeltaPercentage}
                    deltaType={runInfo.deltaType}
                  />
                </p>
              </div>
            )}
          </TileButton>
        </Tooltip>
      </foreignObject>
    </g>
  );
};

interface MetricsTreemapProps {
  items: Array<ReportMetricRow>;
  emptyMessage?: React.ReactNode;
  onItemClick?: (entryId: string) => void;
}

export const MetricsTreemap = (props: MetricsTreemapProps & React.ComponentProps<'div'>) => {
  const { className = '', items, onItemClick, emptyMessage = 'No data', ...restProps } = props;

  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();

  const treemapHierarchy = useMemo(() => {
    const children = items.map((item) => {
      // set tile value to the largest run value to display the impact of deleted items
      const values = item.runs.map((run) => run?.value || 0);
      const value = Math.max(...values);

      return {
        id: item.key,
        value,
        item,
      };
    });

    const treemapData = {
      id: 'root',
      name: 'root',
      value: 0,
      children,
    };

    const customHierarchy = hierarchy<RootTree>(treemapData);
    customHierarchy.sum((node) => node.value);
    // @ts-expect-error
    customHierarchy.sort((a, b) => b.value - a.value);

    return customHierarchy;
  }, [items]);

  const cells = useMemo(() => {
    const createTremapLayout = treemap()
      .size([width, height])
      .tile(treemapSquarify.ratio(SQUARIFY_RATIO))
      .paddingOuter(PADDING_OUTER)
      .paddingInner(PADDING_INNER);
    // @ts-expect-error
    const tremapLayout = createTremapLayout(treemapHierarchy);

    return tremapLayout.leaves().filter((leaf) => Boolean(leaf.parent));
  }, [height, width, treemapHierarchy]);

  return (
    <div className={cx(css.root, className)} {...restProps} ref={containerRef}>
      {cells.length > 0 ? (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className={css.canvas}
        >
          {cells.map((leaf) => {
            if (!leaf.parent) {
              return null;
            }

            return (
              <Tile
                x={leaf.x0}
                y={leaf.y0}
                width={leaf.x1 - leaf.x0}
                height={leaf.y1 - leaf.y0}
                data={leaf.data as TreeNode}
                key={leaf.id}
                onClick={onItemClick}
              />
            );
          })}
        </svg>
      ) : (
        <div className={css.emptyMessage}>
          <div className={css.emptyMessageWrapper}>{emptyMessage}</div>
        </div>
      )}
    </div>
  );
};
