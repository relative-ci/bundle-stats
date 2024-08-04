import type { ReportMetricRow } from '@bundle-stats/utils';
import type { Module } from '@bundle-stats/utils/types/webpack/types';

export interface SortAction {
  field: string;
  direction: 'asc' | 'desc' | '';
}

interface FilterFieldData {
  label: string;
  defaultValue: boolean;
  disabled?: boolean;
}

type FilterGroupFieldData = {
  label: string;
  children: Array<{ key: string } & FilterFieldData>;
};

type FilterFieldsData = Record<string, FilterFieldData | FilterGroupFieldData>;

export type ReportMetricModuleRow = {
  thirdParty: boolean;
  duplicated: boolean;
  fileType: string;
} & Omit<ReportMetricRow, 'runs'> & {
    runs: Array<(Module & ReportMetricRun) | null | undefined>;
  };
