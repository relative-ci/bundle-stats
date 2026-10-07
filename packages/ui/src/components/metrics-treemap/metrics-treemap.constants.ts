import type { ReportMetricRow } from '@bundle-stats/utils';

export interface TreeTotal {
  current: number;
  baseline?: number;
}

export interface TreeLeaf {
  /**
   * Node id - file/directory path
   */
  id: string;
  /**
   * Node label - file/directory baseline
   */
  label: string;
  /**
   * Node value - the max amount between item run values
   */
  value: number;
  /**
   * Corresponding report metric item
   */
  item: ReportMetricRow;
}

export interface Tree {
  /**
   * Node id - file/directory path
   */
  id: string;
  /**
   * Node label - file/directory baseline
   */
  label: string;
  /**
   * Node value - 0 for groups
   */
  value: number;
  /**
   * List of children nodes
   */
  children: TreeNodeChildren;
  /**
   * children total values for nested
   */
  total?: TreeTotal;
}

export type TreeNode = Tree | TreeLeaf;

export type TreeNodeChildren = Array<TreeNode>;

export type TileGroupSizeDisplay = 'minimal' | 'small' | 'default';

export type TileSizeDisplay = 'minimal' | 'small' | 'default';

/**
 * DOM marker set on every tile and tile group title (see `metrics-treemap.tsx`).
 * `MetricsTreemap` uses it to resolve the hovered node from a single delegated
 * pointer handler, instead of attaching hover listeners to every cell.
 */
export const NODE_ID_ATTRIBUTE = 'data-treemap-id';
export const NODE_ID_SELECTOR = `[${NODE_ID_ATTRIBUTE}]`;

export const SQUARIFY_RATIO = 1.66;
export const PADDING_OUTER = 1;
export const PADDING_INNER = 2;
export const NESTED_PADDING = 4;
export const NESTED_PADDING_TOP = 16 + NESTED_PADDING * 2;
export const NESTED_PADDING_LEFT = 8;
