import React, { type ComponentProps, type MouseEventHandler, useCallback, useMemo } from 'react';
import cx from 'classnames';
import type { HierarchyRectangularNode } from 'd3';

import type { TreeLeaf, TreeNode, Tree } from '../metrics-treemap.constants';
import * as I18N from '../metrics-treemap.i18n';
import { getGroupRunInfo, resolveTileGroupSizeDisplay } from '../metrics-treemap.utils';
import { type TileProps, Tile } from '../tile';
import { TileGroupTitle } from '../tile-group-title';
import css from './tile-group.module.css';

export interface TileGroupProps extends ComponentProps<'div'> {
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
   * Nested treemap variation
   */
  nested?: boolean;
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

export const TileGroup = (props: TileGroupProps) => {
  const {
    title = '',
    total,
    id,
    childNodes,
    nested = false,
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
    css.root,
    css[`tileGroup--${groupRunInfo?.deltaType}`],
    css[`tileGroup--${displaySize}`],
    nested && css.nested,
  );

  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus */
  if (title && displaySize === 'minimal') {
    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={I18N.TILE_GROUP_LABEL}
        className={rootClassName}
        style={{ left, top, width, height }}
      >
        <TileGroupTitle id={id} fill />
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
        <TileGroupTitle id={id} title={title} fill />
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
              nested={nested}
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
