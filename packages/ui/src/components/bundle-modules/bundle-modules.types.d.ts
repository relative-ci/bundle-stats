import type { Module } from '@bundle-stats/utils/lib-esm/webpack/types';
import type { ReportMetricRun } from '@bundle-stats/utils/types/report/types';

export type ReportMetricModuleRow = {
  thirdParty: boolean;
  duplicated: boolean;
  fileType: string;
} & ReportMetricRun &
  Module;
