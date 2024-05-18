import React, {
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  type RefObject,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useDebounce, useHoverDirty, useMeasure, useMouseHovered } from 'react-use';
import cx from 'classnames';
import { HierarchyRectangularNode, hierarchy, treemap, treemapSquarify } from 'd3';
import { Tooltip, TooltipArrow, TooltipAnchor, useTooltipState } from 'ariakit/tooltip';
import {
  type ReportMetricRow,
  type MetricRunInfo,
  type MetricRunInfoBaseline,
  getMetricRunInfo,
  METRIC_TYPE_CONFIGS,
} from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { Delta } from '../delta';
import { RunInfo } from '../run-info';
import type { TreeLeaf, TreeNode, Tree } from './metrics-treemap.constants';
import * as I18N from './metrics-treemap.i18n';
import css from './metrics-treemap.module.css';
import { resolveGroupDeltaType } from './metrics-treemap.utils';

const SQUARIFY_RATIO = 1.66;
const PADDING_OUTER = 1;
const PADDING_INNER = 2;
const NESTED_PADDING = 4;
const NESTED_PADDING_TOP = 16 + NESTED_PADDING * 2;
const NESTED_PADDING_LEFT = 8;

/**
 * Resolve the tile's size using predefined values to avoid
 * computing the size of the content for every tile
 */
const PADDING_TOP = 4;
const PADDING_BOTTOM = 2; // substracted to allow longer texts to appear
const PADDING_LEFT = 2;
const PADDING_RIGHT = 4; // substracted to allow longer texts to not break
const VERTICAL_SPACING = 4;
const LINE_HEIGHT = 16;
const LINE_HEIGHT_SMALL = 13.3;

function resolveTileGroupSizeDisplay(width: number, height: number): TileSizeDisplay {
  if (height < NESTED_PADDING_TOP || width < 24) {
    return 'minimal';
  }

  if (height < NESTED_PADDING_TOP + 8) {
    return 'small';
  }

  return 'default';
}

type TileSizeDisplay = 'minimal' | 'small' | 'default';

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
  sizeDisplay: 'minimal' | 'small' | 'default';
  /**
   * Metric run info
   */
  runInfo: MetricRunInfo;
}

const TileContent = forwardRef((props: TileContentProps, ref: Ref<HTMLDivElement>) => {
  const { label, sizeDisplay, item, runInfo } = props;

  if (sizeDisplay === 'minimal') {
    return <div className={css.tileContent} ref={ref} />;
  }

  return (
    <div className={css.tileContent} ref={ref}>
      <p className={css.tileContentLabel}>{label || item.label}</p>
      {sizeDisplay !== 'small' && (
        <p className={css.tileContentValue}>
          <span className={css.tileContentMetric}>{runInfo.displayValue}</span>
          <Delta
            className={css.tileContentDelta}
            displayValue={runInfo.displayDeltaPercentage}
            deltaType={runInfo.deltaType}
          />
        </p>
      )}
    </div>
  );
});

const TileContentWithTooltip = (props: TileContentProps & { parentRef: RefObject<Element> }) => {
  const { label, sizeDisplay, item, runInfo, parentRef } = props;

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
        <TileContent label={label} sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
      </TooltipAnchor>
      <Tooltip state={tooltipState} className={css.tooltip}>
        <TooltipArrow state={tooltipState} size={16} className={css.tileTooltipArrow} />
        <TileTooltipContent item={item} />
      </Tooltip>
    </>
  );
};

interface TileProps {
  left: number;
  top: number;
  width: number;
  height: number;
  data: TreeLeaf;
  onClick?: (id: string) => void;
}

const Tile = (props: TileProps) => {
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

  const contentRef = useRef<HTMLDivElement>(null);
  const hover = useHoverDirty(contentRef);

  const className = cx(
    css.tile,
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
      ref={contentRef}
      style={{ left, top, width, height }}
      className={className}
    >
      {hover ? (
        <TileContentWithTooltip
          label={label}
          sizeDisplay={sizeDisplay}
          item={item}
          runInfo={runInfo}
          parentRef={contentRef}
        />
      ) : (
        <TileContent label={label} sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
      )}
    </div>
  );
};

interface TileGroupProps extends ComponentProps<'div'> {
  /**
   * Node title
   */
  title?: string;
  /**
   * Group sum
   */
  total?: Tree['total'];
  /**
   * Node id
   */
  id: string;
  /**
   * Node children
   */
  childNodes: HierarchyRectangularNode<TreeNode>['children'];
  /**
   * On click tile handler
   */
  onItemClick: TileProps['onClick'];
  /**
   * On click group title
   */
  onGroupClick?: (groupId: string) => void;

  /**
   * Node rectangle dimensions
   */
  width?: number;
  height?: number;

  /**
   * Node rectangle relative coordinates (relative to parent)
   */
  left: number;
  top: number;

  /**
   * Node rectangle absolute coordinates (relative to canvas)
   */
  absoluteLeft: number;
  absoluteTop: number;
}

const TileGroup = (props: TileGroupProps) => {
  const {
    title = '',
    total,
    id,
    childNodes,
    onItemClick,
    onGroupClick,
    left,
    top,
    width,
    height,
    absoluteLeft,
    absoluteTop,
  } = props;

  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onGroupClick?.(id);
      event.stopPropagation();
    },
    [onGroupClick, id],
  );

  const displaySize = useMemo(
    () => resolveTileGroupSizeDisplay(width || 0, height || 0),
    [width, height],
  );

  const metricRunInfo =
    total &&
    getMetricRunInfo(METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE, total.current, total.baseline);
  const groupDeltaType = resolveGroupDeltaType(metricRunInfo);
  const rootClassName = cx(css.tileGroup, css[`tileGroup--${groupDeltaType}`]);

  if (title && displaySize === 'minimal') {
    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={I18N.TILE_GROUP_LABEL}
        className={rootClassName}
        style={{ left, top, width, height }}
      />
    );
  }

  if (title && displaySize === 'small') {
    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={I18N.TILE_GROUP_LABEL}
        style={{ left, top, width, height }}
        className={rootClassName}
      >
        <div className={css.tileGroupTitle}>
          <span className={css.tileGroupTitleText}>{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      role="button"
      aria-label={I18N.TILE_GROUP_LABEL}
      className={cx(rootClassName, css.tileGroupSizeDefault)}
      style={{ left, top, width, height }}
    >
      {title && (
        <div className={css.tileGroupTitle}>
          <span className={css.tileGroupTitleText}>{title}</span>
          {metricRunInfo && (
            <span className={css.tileGroupTitleTotal}>
              {`${metricRunInfo.displayValue}`}
              {'displayDelta' in metricRunInfo && ` (${metricRunInfo.displayDeltaPercentage})`}
            </span>
          )}
        </div>
      )}
      {childNodes?.map((childNode) => {
        if ('children' in childNode) {
          const groupData = childNode.data as Tree;

          return (
            <TileGroup
              title={groupData.label}
              total={groupData.total}
              id={groupData.id}
              childNodes={childNode.children}
              left={childNode.x0 - absoluteLeft}
              top={childNode.y0 - absoluteTop}
              absoluteLeft={childNode.x0}
              absoluteTop={childNode.y0}
              width={childNode.x1 - childNode.x0}
              height={childNode.y1 - childNode.y0}
              onItemClick={onItemClick}
              onGroupClick={onGroupClick}
              key={groupData.id}
            />
          );
        }

        return (
          <Tile
            data={childNode.data as TreeLeaf}
            left={childNode.x0 - absoluteLeft}
            top={childNode.y0 - absoluteTop}
            width={childNode.x1 - childNode.x0}
            height={childNode.y1 - childNode.y0}
            onClick={onItemClick}
            key={childNode.data.id}
          />
        );
      })}
    </div>
  );
};

interface UseMetricsTreemapHierarchyParams {
  treeNodes: Tree;
  width: number;
  height: number;
  nested: boolean;
}

function useMetricsTreemapHierarchy(params: UseMetricsTreemapHierarchyParams) {
  const { treeNodes, width, height, nested } = params;

  const treemapHierarchy = useMemo(() => {
    const customHierarchy = hierarchy<Tree>(treeNodes);

    customHierarchy.sum((node) => node.value);
    // sort by value descending for all cases
    // @ts-expect-error
    customHierarchy.sort((a, b) => b.value - a.value);

    return customHierarchy;
  }, [treeNodes]);

  const treemapNodes = useMemo(() => {
    let createTremapLayout = treemap()
      .size([width, height])
      .tile(treemapSquarify.ratio(SQUARIFY_RATIO))
      .paddingOuter(PADDING_OUTER);

    // Add padding top for group title
    if (nested) {
      createTremapLayout = createTremapLayout
        .padding(NESTED_PADDING)
        .paddingLeft(NESTED_PADDING_LEFT)
        .paddingTop(NESTED_PADDING_TOP);
    } else {
      createTremapLayout = createTremapLayout.paddingInner(PADDING_INNER);
    }

    // @ts-expect-error
    return createTremapLayout(treemapHierarchy) as HierarchyRectangularNode<TreeNode>;
  }, [height, width, treemapHierarchy]);

  return treemapNodes;
}

interface MetricsTreemapProps {
  treeNodes: Tree;
  emptyMessage?: ReactNode;
  nested?: boolean;
  onItemClick?: (entryId: string) => void;
  onGroupClick?: (entryId: string) => void;
}

export const MetricsTreemap = (props: MetricsTreemapProps & ComponentProps<'div'>) => {
  const {
    className = '',
    treeNodes,
    onItemClick,
    onGroupClick,
    emptyMessage = 'No data',
    nested = false,
    ...restProps
  } = props;

  const [containerRef, { width, height }] = useMeasure<HTMLDivElement>();
  const rootNode = useMetricsTreemapHierarchy({ treeNodes, width, height, nested });

  return (
    <div
      className={cx(css.root, nested && css.nested, className)}
      {...restProps}
      ref={containerRef}
    >
      {rootNode.children && rootNode.children?.length > 0 ? (
        <div className={css.canvas}>
          <TileGroup
            title={nested ? rootNode.data.label : undefined}
            total={(rootNode.data as Tree).total}
            id={rootNode.data.id}
            childNodes={rootNode.children}
            onItemClick={onItemClick}
            onGroupClick={onGroupClick}
            left={rootNode.x0}
            top={rootNode.y0}
            absoluteLeft={rootNode.x0}
            absoluteTop={rootNode.y0}
            width={rootNode.x1 - rootNode.x0}
            height={rootNode.y1 - rootNode.y0}
          />
        </div>
      ) : (
        <div className={css.emptyMessage}>
          <div className={css.emptyMessageWrapper}>{emptyMessage}</div>
        </div>
      )}
    </div>
  );
};
