import type { ReportMetricRow } from '@bundle-stats/utils';

export interface TreeNode {
  id: string;
  value: number;
  item: ReportMetricRow;
}

export interface TreeParentNode {
  id: string;
  value: number;
  children: Array<TreeNode | TreeParentNode>;
}

export type TreeNodeChildren = Array<TreeParentNode | TreeNode>;

export interface TreeRootNode {
  id: string;
  name: string;
  value: number;
  children: TreeNodeChildren;
}
