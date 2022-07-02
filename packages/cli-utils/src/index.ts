import * as T from './text';

export * from './baseline';
export * from './create-artifacts';
export * from './constants';

export const TEXT = T;

export function getReportInfo(report: any): any {
  return report?.insights?.webpack?.assetsSizeTotal?.data;
}
