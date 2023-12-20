import type { MetricRunInfo, MetricRunInfoBaseline, MetricTypeConfig } from '../constants';

export interface MetricValue {
  value: number;
  name?: string;
}

export interface ReportRow {
  key: string;
  runs: Array<MetricValue | null>;
}

export type ReportMetricRun = { name?: MetricValue['name'] } & (
  | MetricRunInfo
  | MetricRunInfoBaseline
);

export interface ReportMetricRow {
  key: string;
  label: string;
  biggerIsBetter: MetricTypeConfig['biggerIsBetter'];
  changed: boolean;
  runs: Array<ReportMetricRun | null>;
}

export type MetricReportRowTransformFn = (row: ReportRow) => ReportMetricRow;
