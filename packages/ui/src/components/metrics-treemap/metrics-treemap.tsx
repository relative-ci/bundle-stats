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
import { useHoverDirty, useMeasure } from 'react-use';
import cx from 'classnames';
import { HierarchyRectangularNode, hierarchy, treemap, treemapSquarify } from 'd3';
import { Tooltip, TooltipArrow, TooltipAnchor } from 'ariakit/tooltip';
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
  SQUARIFY_RATIO,
  PADDING_OUTER,
  PADDING_INNER,
  NESTED_PADDING,
  NESTED_PADDING_TOP,
  NESTED_PADDING_LEFT,
  TileSizeDisplay,
} from './metrics-treemap.constants';
import * as I18N from './metrics-treemap.i18n';
import css from './metrics-treemap.module.css';
import {
  resolveGroupDeltaType,
  resolveTileSizeDisplay,
  resolveTileGroupSizeDisplay,
  useTooltipStateWithMouseFollow,
} from './metrics-treemap.utils';

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
  sizeDisplay: TileSizeDisplay;
  /**
   * Metric run info
   */
  runInfo: MetricRunInfo;
}

const TileContent = forwardRef((props: TileContentProps, ref: Ref<HTMLDivElement>) => {
  const { label, sizeDisplay, item, runInfo } = props;

  // Render only the container
  if (sizeDisplay === 'minimal') {
    return <div className={css.tileContent} ref={ref} />;
  }

  const resolvedLabel = label || item.label;

  // Render only the label
  if (sizeDisplay === 'small') {
    return (
      <div className={css.tileContent} ref={ref}>
        <p className={css.tileContentLabel}>{resolvedLabel}</p>
      </div>
    );
  }

  return (
    <div className={css.tileContent} ref={ref}>
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
});

const TileContentWithTooltip = (props: TileContentProps & { parentRef: RefObject<Element> }) => {
  const { label, sizeDisplay, item, runInfo, parentRef } = props;

  const tooltipState = useTooltipStateWithMouseFollow({ parentRef });

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

interface TileGroupTitleTooltipContentProps {
  title: string;
  runInfo?: MetricRunInfo;
  baselineDisplayValue?: string;
}

const TileGroupTitleTooltipContent = (props: TileGroupTitleTooltipContentProps) => {
  const { title, runInfo, baselineDisplayValue } = props;

  return (
    <Stack space="small" className={css.tileTooltip}>
      <h3 className={css.tileTooltipContentTitle}>
        <FileName as="code" name={title} />
      </h3>
      {runInfo && (
        <RunInfo
          current={runInfo.displayValue}
          baseline={baselineDisplayValue}
          delta={runInfo.displayDeltaPercentage}
          deltaType={runInfo.deltaType}
        />
      )}
    </Stack>
  );
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

type TileGroupTitleContentWithTooltipProps = {
  parentRef: RefObject<Element>;
  tooltipContent: TileGroupTitleTooltipContentProps;
} & TileGroupTitleContentProps;

const TileGroupTitleContentWithTooltip = (props: TileGroupTitleContentWithTooltipProps) => {
  const { parentRef, tooltipContent, ...restProps } = props;

  const tooltipState = useTooltipStateWithMouseFollow({ parentRef });

  return (
    <>
      <TooltipAnchor state={tooltipState} className={css.tileContentTooltipAnchor}>
        <TileGroupTitleContent {...restProps} />
      </TooltipAnchor>
      <Tooltip state={tooltipState} className={css.tooltip}>
        <TooltipArrow state={tooltipState} size={16} className={css.tileTooltipArrow} />
        <TileGroupTitleTooltipContent {...tooltipContent} />
      </Tooltip>
    </>
  );
};

type TileGroupTitleProps = Omit<TileGroupTitleContentWithTooltipProps, 'parentRef'>;

const TileGroupTitle = (props: TileGroupTitleProps) => {
  const { tooltipContent, ...restProps } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const hover = useHoverDirty(contentRef);

  return (
    <div className={css.tileGroupTitle} ref={contentRef}>
      {hover ? (
        <TileGroupTitleContentWithTooltip
          parentRef={contentRef}
          tooltipContent={tooltipContent}
          {...restProps}
        />
      ) : (
        <TileGroupTitleContent {...restProps} />
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

  // Prepare data
  const [runInfo, baselineDisplayValue, deltaType] = useMemo(() => {
    if (!total) {
      return [];
    }

    const resolvedRunInfo = getMetricRunInfo(
      METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE,
      total.current,
      total.baseline,
    ) as MetricRunInfo;
    const resolvedBaselineDisplayValue = formatFileSize(total.baseline);
    const resolvedDeltaType = resolveGroupDeltaType(resolvedRunInfo);

    return [resolvedRunInfo, resolvedBaselineDisplayValue, resolvedDeltaType];
  }, [total]);

  const rootClassName = cx(
    css.tileGroup,
    css[`tileGroup--${deltaType}`],
    css[`tileGroup--${displaySize}`],
  );

  // Tooltip data
  // - by default show the node id (full path) as title
  const tooltipContent = {
    title: id || title,
    runInfo,
    baselineDisplayValue,
  } as TileGroupTitleTooltipContentProps;

  if (title && displaySize === 'minimal') {
    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={I18N.TILE_GROUP_LABEL}
        className={rootClassName}
        style={{ left, top, width, height }}
      >
        <TileGroupTitle tooltipContent={tooltipContent} />
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
        <TileGroupTitle title={title} tooltipContent={tooltipContent} />
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
      <TileGroupTitle title={title} runInfo={runInfo} tooltipContent={tooltipContent} />
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
