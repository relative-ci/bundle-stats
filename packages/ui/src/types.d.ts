import type { ReportMetricRow } from '@bundle-stats/utils';
import type { Asset, Module } from '@bundle-stats/utils/types/webpack/types';

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

export type ReportMetricAssetRowMetaStatus = 'added' | 'removed';

export type ReportMetricAssetRow = {
  /**
   * Asset isEntry - at least one run has isEntry truthy
   */
  isEntry: ReportMetricAssetRowMetaStatus | boolean;
  /**
   * Asset isInitial - at least one run has isInitial truthy
   */
  isInitial: ReportMetricAssetRowMetaStatus | boolean;
  /**
   * Asset isChunk - at least one run has isChunk truthy
   */
  isChunk: ReportMetricAssetRowMetaStatus | boolean;
  /**
   * Asset isAsset - at least one run has isAsset truthy
   */
  isAsset: boolean;
  /**
   * Asset name is not predictive
   */
  isNotPredictive: boolean;
  /**
   * Report asset row isEntry - at least one run has isEntry
   */
  fileType: string;
} & Omit<ReportMetricRow, 'runs'> & { runs: Array<(Asset & ReportMetricRun) | null> };

export type ReportMetricModuleRow = {
  thirdParty: boolean;
  duplicated: boolean;
  fileType: string;
} & Omit<ReportMetricRow, 'runs'> & {
    runs: Array<
      (Module & ReportMetricRun & { size: number; sizeDuplicate: number; sizeTotal: number }) | null
    >;
  };
