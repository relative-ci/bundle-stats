export enum MetricTypeType {
  'METRIC_TYPE_NUMERIC',
  'METRIC_TYPE_SCORE',
  'METRIC_TYPE_FILE_SIZE',
  'METRIC_TYPE_DURATION',
  'METRIC_TYPE_PERCENTAGE'
}

export interface MetricTypeConfig {
  label: string;
  description: string;
  type: MetricTypeType;
}

export interface MetricType extends MetricTypeConfig {
  formatter: Function;
  biggerIsBetter: boolean;
}

export enum MetricRunInfoDeltaType {
  'HIGH_NEGATIVE',
  'NEGATIVE',
  'LOW_NEGATIVE',
  'NO_CHANGE',
  'LOW_POSITIVE',
  'POSITIVE',
  'HIGH_POSITIVE'
}

export interface MetricRun {
  value: number;
}

export interface MetricRunInfo extends MetricRunInfo {
  value: number;
  displayValue: string;
  delta?: number;
  displayDelta?: string;
  displayDeltaPercentage?: string;
  deltaType?: MetricRunInfoDeltaType;
}

export interface LighthouseSource {
  lighthouseVersion: string;
  fetchTime: string;
  requestedUrl: string;
  categories: { [key: string]: { score: number } }
  audits: { [key: string]: { score: number; numericValue: number } }
}

export interface LighthouseMetricsCategoryScores {
  performanceScore: MetricRun;
  accessibilityScore: MetricRun;
  bestPracticesScore: MetricRun;
  seoScore: MetricRun;
  pwaScore: MetricRun;
}

export interface LighthouseMetricsScore {
  score: MetricRun;
}

export interface LighthouseMetricsAudits {
  speedIndex: MetricRun;
  firstMeaningfulPaint: MetricRun;
  timeToFirstByte: MetricRun;
  firstInteractive: MetricRun;
  totalByteWeight: MetricRun;
  domSize: MetricRun;
}
