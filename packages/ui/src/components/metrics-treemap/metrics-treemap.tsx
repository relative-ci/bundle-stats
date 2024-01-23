import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import cx from 'classnames';
import { useHoverDirty, useMeasure } from 'react-use';
import type { ReportMetricRow, MetricRunInfo, MetricRunInfoBaseline } from '@bundle-stats/utils';
import { hierarchy, treemap, treemapSquarify } from 'd3';
import { Tooltip, TooltipArrow, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
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

function resolveLeafSizeDisplay(width: number, height: number): TileSizeDisplay {
  if (
    height > PADDING_TOP + PADDING_BOTTOM + VERTICAL_SPACING + LINE_HEIGHT * 2 &&
    width > PADDING_LEFT + PADDING_RIGHT + 128
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

interface LeafTooltipContentProps {
  item: ReportMetricRow;
}

const LeafTooltipContent = (props: LeafTooltipContentProps) => {
  const { item } = props;

  const currentRun = item.runs[0] as MetricRunInfo;
  const baselineRun = item.runs[item.runs.length - 1] as MetricRunInfoBaseline;

  return (
    <Stack space="small" className={css.leafTooltipContent}>
      <h3 className={css.leafTooltipContentTitle}>
        <FileName as="code" name={item.label} />
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

interface LeafContentProps {
  sizeDisplay: 'minimal' | 'small' | 'default';
  item: ReportMetricRow;
  runInfo: MetricRunInfo;
}

const LeafContent = forwardRef((props: LeafContentProps, ref: React.Ref<HTMLDivElement>) => {
  const { sizeDisplay, item, runInfo } = props;

  if (sizeDisplay === 'minimal') {
    return <div className={css.leafContent} ref={ref} />;
  }

  return (
    <div className={css.leafContent} ref={ref}>
      <p className={css.leadContentLabel}>{item.label}</p>
      {sizeDisplay !== 'small' && (
        <p className={css.leadContentValue}>
          <span className={css.leadContentMetric}>{runInfo.displayValue}</span>
          <Delta
            className={css.leadContentDelta}
            displayValue={runInfo.displayDeltaPercentage}
            deltaType={runInfo.deltaType}
          />
        </p>
      )}
    </div>
  );
});

const LeafContentWithTooltip = (props: LeafContentProps) => {
  const { sizeDisplay, item, runInfo } = props;

  const tooltipState = useTooltipState({ gutter: 8 });

  return (
    <>
      <TooltipAnchor state={tooltipState} className={css.leafContentTooltipAnchor}>
        <LeafContent sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
      </TooltipAnchor>
      <Tooltip state={tooltipState} className={css.tooltip}>
        <TooltipArrow state={tooltipState} size={16} className={css.leafTooltipArrow} />
        <LeafTooltipContent item={item} />
      </Tooltip>
    </>
  );
};

const LeafAction = forwardRef((props: React.ComponentProps<'button'>, ref) => (
  // @ts-expect-error
  <button type="button" xmlns="http://www.w3.org/1999/xhtml" ref={ref} {...props} />
));

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

const Leaf = (props: LeafProps) => {
  const { x, y, width, height, data, onClick } = props;

  const { item } = data;
  const runInfo = item.runs?.[0] as MetricRunInfo;

  const sizeDisplay = useMemo(() => resolveLeafSizeDisplay(width, height), [width, height]);
  const handleOnClick = useCallback(() => onClick?.(item.key), [item.key]);
  const leadContentRef = useRef<HTMLElement>(null);
  const hover = useHoverDirty(leadContentRef);

  const leafClassName = cx(
    css.leaf,
    css[`leaf-${runInfo.deltaType}`],
    sizeDisplay === 'small' && css.leafSmall,
  );

  return (
    <g className={leafClassName}>
      <rect x={x} y={y} width={width} height={height} className={css.leafBackground} />
      <rect x={x} y={y} width={width} height={height} className={css.leafBackdrop} />
      <foreignObject height={height} width={width} x={x} y={y} className={css.leafWrapper}>
        <LeafAction onClick={handleOnClick} ref={leadContentRef} className={css.leafAction}>
          {hover ? (
            <LeafContentWithTooltip sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
          ) : (
            <LeafContent sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
          )}
        </LeafAction>
      </foreignObject>
    </g>
  );
};

interface UseMetricsTreemapHierarchyParams {
  items: Array<ReportMetricRow>;
  width: number;
  height: number;
}

function useMetricsTreemapHierarchy(params: UseMetricsTreemapHierarchyParams) {
  const { items, width, height } = params;

  const treemapHierarchy = useMemo(() => {
    const children = items.map((item) => {
      /**
       * Set leaf value to the largest run value to allow to
       * display the impact of deleted / items
       */
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

  return cells;
}

interface MetricsTreemapProps {
  items: Array<ReportMetricRow>;
  emptyMessage?: React.ReactNode;
  onItemClick?: (entryId: string) => void;
}

export const MetricsTreemap = (props: MetricsTreemapProps & React.ComponentProps<'div'>) => {
  const { className = '', items, onItemClick, emptyMessage = 'No data', ...restProps } = props;

  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const cells = useMetricsTreemapHierarchy({ items, width, height });

  return (
    <div className={cx(css.root, className)} {...restProps} ref={containerRef}>
      {cells.length > 0 ? (
        <svg viewBox={`0 0 ${width} ${height}`} className={css.canvas}>
          {cells.map((leaf) => {
            if (!leaf.parent) {
              return null;
            }

            return (
              <Leaf
                x={leaf.x0}
                y={leaf.y0}
                width={leaf.x1 - leaf.x0}
                height={leaf.y1 - leaf.y0}
                data={leaf.data as TreeNode}
                onClick={onItemClick}
                key={leaf.id}
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
