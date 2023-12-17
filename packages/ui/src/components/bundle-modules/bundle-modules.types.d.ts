import { Module } from '@bundle-stats/utils/lib-esm/webpack/types';
import { ReportMetricRun } from '@bundle-stats/utils/types/report/types';

export interface Chunk {
  id: string;
  name: string;
}

export type ReportMetricModuleRow = {
  thirdParty: boolean;
  duplicated: boolean;
  fileType: string;
} & ReportMetricRun &
  Module;

interface Job {
  label: string;
  internalBuildNumber: number;
  meta?: {
    webpack?: {
      chunks?: Array<Chunk>;
    };
  };
}
