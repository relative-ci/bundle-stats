import type { ReportMetricRow } from '@bundle-stats/utils';

export interface TreeLeaf {
  id: string;
  label: string;
  value: number;
  item: ReportMetricRow;
}

export type TreeNodeChildren = Array<TreeNode | TreeLeaf>;

export interface TreeNode {
  id: string;
  label: string;
  value: number;
  children: TreeNodeChildren;
}
