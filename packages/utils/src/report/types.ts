export interface MetricValue {
  value: number;
  name?: string;
}

export interface ReportRow {
  key: string;
  runs: Array<MetricValue | null>;
}
