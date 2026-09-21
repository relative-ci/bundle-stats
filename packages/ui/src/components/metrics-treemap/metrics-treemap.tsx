import React, {
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useMeasure } from 'react-use';
import cx from 'classnames';
import { HierarchyRectangularNode, hierarchy, treemap, treemapSquarify } from 'd3';
import { Tooltip, TooltipArrow } from 'ariakit/tooltip';
import {
  type ReportMetricRow,
  type MetricRunInfo,
  type MetricRunInfoBaseline,
  METRIC_TYPE_CONFIGS,
  formatFileSize,
  getMetricRunInfo,
} from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { Delta } from '../delta';
import { RunInfo } from '../run-info';
import {
  type TreeLeaf,
  type TreeNode,
  type Tree,
  type TreeTotal,
  SQUARIFY_RATIO,
  PADDING_OUTER,
  PADDING_INNER,
  NESTED_PADDING,
  NESTED_PADDING_TOP,
  NESTED_PADDING_LEFT,
  NODE_ID_SELECTOR,
  TileSizeDisplay,
} from './metrics-treemap.constants';
import * as I18N from './metrics-treemap.i18n';
import css from './metrics-treemap.module.css';
import {
  getTreemapNodesIndex,
  resolveGroupDeltaType,
  resolveTileSizeDisplay,
  resolveTileGroupSizeDisplay,
  useTreemapTooltipState,
} from './metrics-treemap.utils';

/**
 * Resolve the run info of a tile group from the children total
 */
function getGroupRunInfo(total: TreeTotal) {
  const runInfo = getMetricRunInfo(
    METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE,
    total.current,
    total.baseline,
  ) as MetricRunInfo;

  return {
    runInfo,
    baselineDisplayValue: formatFileSize(total.baseline),
    deltaType: resolveGroupDeltaType(runInfo),
  };
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
        delta={currentRun.displayDelta}
        deltaPercentage={currentRun.displayDeltaPercentage}
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
  sizeDisplay: TileSizeDisplay;
  /**
   * Metric run info
   */
  runInfo: MetricRunInfo;
}

const TileContent = (props: TileContentProps) => {
  const { label, sizeDisplay, item, runInfo } = props;

  // Render only the container
  if (sizeDisplay === 'minimal') {
    return <div className={css.tileContent} />;
  }

  const resolvedLabel = label || item.label;

  // Render only the label
  if (sizeDisplay === 'small') {
    return (
      <div className={css.tileContent}>
        <p className={css.tileContentLabel}>{resolvedLabel}</p>
      </div>
    );
  }

  return (
    <div className={css.tileContent}>
      <p className={css.tileContentLabel}>{label || item.label}</p>
      <p className={css.tileContentValue}>
        <span className={css.tileContentMetric}>{runInfo.displayValue}</span>
        <Delta
          className={css.tileContentDelta}
          displayValue={runInfo.displayDeltaPercentage}
          deltaType={runInfo.deltaType}
        />
      </p>
    </div>
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
      data-treemap-id={data.id}
      style={{ left, top, width, height }}
      className={className}
    >
      <TileContent label={label} sizeDisplay={sizeDisplay} item={item} runInfo={runInfo} />
    </div>
  );
};

interface TileGroupTooltipContentProps {
  node: Tree;
}

const TileGroupTooltipContent = (props: TileGroupTooltipContentProps) => {
  const { node } = props;

  // by default show the node id (full path) as title
  const title = node.id || node.label;
  const groupRunInfo = node.total && getGroupRunInfo(node.total);

  return (
    <Stack space="small" className={css.tileTooltipContent}>
      <h3 className={css.tileTooltipContentTitle}>
        <FileName as="code" name={title} />
      </h3>
      {groupRunInfo && (
        <RunInfo
          current={groupRunInfo.runInfo.displayValue}
          baseline={groupRunInfo.baselineDisplayValue}
          delta={groupRunInfo.runInfo.displayDeltaPercentage}
          deltaType={groupRunInfo.runInfo.deltaType}
        />
      )}
    </Stack>
  );
};

interface TreemapTooltipContentProps {
  node: TreeNode;
}

const TreemapTooltipContent = (props: TreemapTooltipContentProps) => {
  const { node } = props;

  if ('item' in node) {
    return <TileTooltipContent item={node.item} />;
  }

  return <TileGroupTooltipContent node={node} />;
};

interface TileGroupTitleContentProps {
  title?: string;
  runInfo?: MetricRunInfo;
}

const TileGroupTitleContent = (props: TileGroupTitleContentProps) => {
  const { title, runInfo } = props;

  return (
    <div className={css.tileGroupTitleContent}>
      {title && <span className={css.tileGroupTitleText}>{title}</span>}
      {runInfo && (
        <span className={css.tileGroupTitleTotal}>
          {runInfo.displayValue}
          {'displayDelta' in runInfo && `(${runInfo.displayDeltaPercentage})`}
        </span>
      )}
    </div>
  );
};

type TileGroupTitleProps = TileGroupTitleContentProps & {
  /**
   * Node id - used to resolve the tooltip content on hover
   */
  id: string;
};

const TileGroupTitle = (props: TileGroupTitleProps) => {
  const { id, ...restProps } = props;

  return (
    <div className={css.tileGroupTitle} data-treemap-id={id}>
      <TileGroupTitleContent {...restProps} />
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

  // Prepare data
  const groupRunInfo = useMemo(() => (total ? getGroupRunInfo(total) : undefined), [total]);

  const rootClassName = cx(
    css.tileGroup,
    css[`tileGroup--${groupRunInfo?.deltaType}`],
    css[`tileGroup--${displaySize}`],
  );

  if (title && displaySize === 'minimal') {
    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={I18N.TILE_GROUP_LABEL}
        className={rootClassName}
        style={{ left, top, width, height }}
      >
        <TileGroupTitle id={id} />
      </div>
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
        <TileGroupTitle id={id} title={title} />
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
      <TileGroupTitle id={id} title={title} runInfo={groupRunInfo?.runInfo} />
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

  /**
   * A single tooltip is shared by every tile and tile group title:
   * - tiles are tagged with `data-treemap-id`
   * - the pointer is tracked by one delegated handler on the canvas
   * - hiding is deferred so that the tooltip stays up while the pointer
   *   crosses the gutter between two tiles
   */
  const nodesIndex = useMemo(() => getTreemapNodesIndex(treeNodes), [treeNodes]);
  const { tooltipState, setPointer, hoveredNodeId, setHoveredNode, clearHoveredNode } =
    useTreemapTooltipState();
  const canvasRef = useRef<HTMLDivElement>(null);

  // Resolved on render so that the content cannot go stale when the data changes
  const tooltipNode = hoveredNodeId === null ? null : nodesIndex.get(hoveredNodeId);

  const handlePointerEvent = useCallback(
    (event: MouseEvent) => {
      // Anchor to the canvas to let ariakit track scrolling/resizing
      tooltipState.anchorRef.current = canvasRef.current;

      setPointer(event.clientX, event.clientY);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(NODE_ID_SELECTOR);
      setHoveredNode(target?.dataset.treemapId ?? null);
    },
    [tooltipState, setPointer, setHoveredNode],
  );

  const hasNodes = Boolean(rootNode.children && rootNode.children.length > 0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    /**
     * `mouseover` is needed on top of `mousemove`: the hovered element can
     * change without the pointer moving (scrolling, resizing, layout shifts),
     * and the browser only emits boundary events in that case.
     *
     * Native listeners are used instead of the React props because React skips
     * `mouseover` dispatch when `relatedTarget` is inside the same tree.
     */
    canvas.addEventListener('mousemove', handlePointerEvent);
    canvas.addEventListener('mouseover', handlePointerEvent);
    canvas.addEventListener('mouseleave', clearHoveredNode);

    return () => {
      canvas.removeEventListener('mousemove', handlePointerEvent);
      canvas.removeEventListener('mouseover', handlePointerEvent);
      canvas.removeEventListener('mouseleave', clearHoveredNode);
    };
  }, [hasNodes, handlePointerEvent, clearHoveredNode]);

  // Keep the cells out of the tooltip render path
  // (`rootNode` is mutated in place by d3, so the layout size drives the memo)
  const canvasContent = useMemo(
    () => (
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
    ),
    [rootNode, width, height, nested, onItemClick, onGroupClick],
  );

  return (
    <div
      className={cx(css.root, nested && css.nested, className)}
      {...restProps}
      ref={containerRef}
    >
      {hasNodes ? (
        <div className={css.canvas} ref={canvasRef}>
          {canvasContent}
        </div>
      ) : (
        <div className={css.emptyMessage}>
          <div className={css.emptyMessageWrapper}>{emptyMessage}</div>
        </div>
      )}
      {tooltipNode && (
        <Tooltip state={tooltipState} className={css.tooltip}>
          <TooltipArrow state={tooltipState} size={16} className={css.tileTooltipArrow} />
          <TreemapTooltipContent node={tooltipNode} />
        </Tooltip>
      )}
    </div>
  );
};
