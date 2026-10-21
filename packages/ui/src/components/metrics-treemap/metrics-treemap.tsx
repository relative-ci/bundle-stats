import React, {
  type ComponentProps,
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
import type { ReportMetricRow, MetricRunInfo, MetricRunInfoBaseline } from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { RunInfo } from '../run-info';
import {
  type TreeNode,
  type Tree,
  SQUARIFY_RATIO,
  PADDING_OUTER,
  PADDING_INNER,
  NESTED_PADDING,
  NESTED_PADDING_TOP,
  NESTED_PADDING_LEFT,
  NODE_ID_SELECTOR,
} from './metrics-treemap.constants';
import css from './metrics-treemap.module.css';
import {
  getGroupRunInfo,
  getTreemapNodesIndex,
  useTreemapTooltipState,
} from './metrics-treemap.utils';
import { TileGroup } from './tile-group';

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
        nested={nested}
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
    <div className={cx(css.root, className)} {...restProps} ref={containerRef}>
      {hasNodes ? (
        <div className={css.canvas} ref={canvasRef}>
          {canvasContent}
        </div>
      ) : (
        <FlexStack alignItems="center" justifyContent="center" className={css.emptyMessage}>
          <div className={css.emptyMessageWrapper}>{emptyMessage}</div>
        </FlexStack>
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
