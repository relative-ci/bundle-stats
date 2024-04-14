import React, { RefObject, forwardRef, useCallback, useMemo, useRef } from 'react';
import { useDebounce, useHoverDirty, useMeasure, useMouseHovered } from 'react-use';
import cx from 'classnames';
import type { ReportMetricRow, MetricRunInfo, MetricRunInfoBaseline } from '@bundle-stats/utils';
import { hierarchy, treemap, treemapSquarify } from 'd3';
import { Tooltip, TooltipArrow, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { Delta } from '../delta';
import { RunInfo } from '../run-info';
import css from './metrics-treemap.module.css';

const SQUARIFY_RATIO = 1.33;
const PADDING_OUTER = 0;
const PADDING_INNER = 2;

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

interface TileTooltipContentProps {
  item: ReportMetricRow;
}

const TileTooltipContent = (props: TileTooltipContentProps) => {
  const { item } = props;

  const currentRun = item.runs[0] as MetricRunInfo;
  const baselineRun = item.runs[item.runs.length - 1] as MetricRunInfoBaseline;

  return (
    <Stack space="small" className={css.tileTooltipContent}>
      <h3 className={css.tileTooltipContentTitle}>
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

interface TileContentProps {
  sizeDisplay: 'minimal' | 'small' | 'default';
  item: ReportMetricRow;
  runInfo: MetricRunInfo;
}

const TileContent = forwardRef((props: TileContentProps, ref: React.Ref<HTMLDivElement>) => {
  const { sizeDisplay, item, runInfo } = props;

  if (sizeDisplay === 'minimal') {
    return <div className={css.tileContent} ref={ref} />;
  }

  return (
    <div className={css.tileContent} ref={ref}>
      <FileName as="p" className={css.leadContentLabel} name={item.label} />
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

const TileContentWithTooltip = (props: TileContentProps & { parentRef: RefObject<Element> }) => {
  const { sizeDisplay, item, runInfo, parentRef } = props;

  const pointer = useMouseHovered(parentRef, { whenHovered: true });

  // Return custom rect based on the mouse position
  const getAnchorRect = useCallback(() => {
    // Skip custom component rect area if the pointer position is empty
    if (pointer.docX === 0 && pointer.docY === 0 && pointer.elW === 0 && pointer.elH === 0) {
      return null;
    }

    const newRect = {
      x: pointer.docX - (document?.defaultView?.scrollX ?? 0),
      y: pointer.docY - (document?.defaultView?.scrollY ?? 0),
      w: 1,
      h: 1,
    };

    return newRect;
  }, [pointer.docX, pointer.docY]);

  const tooltipState = useTooltipState({ gutter: 12, getAnchorRect, timeout: 120 });

  // Update tooltip position when poiner values are changing
  useDebounce(tooltipState.render, 5, [pointer.docX, pointer.docY]);

  return (
    <>
      <TooltipAnchor state={tooltipState} className={css.tileContentTooltipAnchor}>
        <TileContent sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
      </TooltipAnchor>
      <Tooltip state={tooltipState} className={css.tooltip}>
        <TooltipArrow state={tooltipState} size={16} className={css.tileTooltipArrow} />
        <TileTooltipContent item={item} />
      </Tooltip>
    </>
  );
};

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

interface TileProps {
  left: number;
  top: number;
  width: number;
  height: number;
  data: TreeNode;
  onClick?: (id: string) => void;
}

const Tile = (props: TileProps) => {
  const { left, top, width, height, data, onClick } = props;

  const { item } = data;
  const runInfo = item.runs?.[0] as MetricRunInfo;

  const sizeDisplay = useMemo(() => resolveTileSizeDisplay(width, height), [width, height]);
  const handleOnClick = useCallback(() => onClick?.(item.key), [item.key, onClick]);

  const contentRef = useRef<HTMLButtonElement>(null);
  const hover = useHoverDirty(contentRef);

  const className = cx(
    css.tile,
    css[`tile-${runInfo.deltaType}`],
    sizeDisplay === 'small' && css.tileSmall,
    left === 0 && css.tileFirstCol,
  );

  return (
    <button
      type="button"
      onClick={handleOnClick}
      ref={contentRef}
      style={{ left, top, width, height }}
      className={className}
    >
      {hover ? (
        <TileContentWithTooltip
          sizeDisplay={sizeDisplay}
          item={item}
          runInfo={runInfo}
          parentRef={contentRef}
        />
      ) : (
        <TileContent sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
      )}
    </button>
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
       * Set tile value to the largest run value to allow to
       * display the impact of deleted/new entries
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

  const tiles = useMemo(() => {
    const createTremapLayout = treemap()
      .size([width, height])
      .tile(treemapSquarify.ratio(SQUARIFY_RATIO))
      .paddingOuter(PADDING_OUTER)
      .paddingInner(PADDING_INNER);
    // @ts-expect-error
    const tremapLayout = createTremapLayout(treemapHierarchy);

    return tremapLayout.leaves().filter((tile) => Boolean(tile.parent));
  }, [height, width, treemapHierarchy]);

  return tiles;
}

interface MetricsTreemapProps {
  items: Array<ReportMetricRow>;
  emptyMessage?: React.ReactNode;
  onItemClick?: (entryId: string) => void;
}

export const MetricsTreemap = (props: MetricsTreemapProps & React.ComponentProps<'div'>) => {
  const { className = '', items, onItemClick, emptyMessage = 'No data', ...restProps } = props;

  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const tiles = useMetricsTreemapHierarchy({ items, width, height });

  return (
    <div className={cx(css.root, className)} {...restProps} ref={containerRef}>
      {tiles.length > 0 ? (
        <div className={css.canvas}>
          {tiles.map((tile) => {
            if (!tile.parent) {
              return null;
            }

            return (
              <Tile
                data={tile.data as TreeNode}
                left={tile.x0}
                top={tile.y0}
                width={tile.x1 - tile.x0}
                height={tile.y1 - tile.y0}
                onClick={onItemClick}
                key={tile.id}
              />
            );
          })}
        </div>
      ) : (
        <div className={css.emptyMessage}>
          <div className={css.emptyMessageWrapper}>{emptyMessage}</div>
        </div>
      )}
    </div>
  );
};
