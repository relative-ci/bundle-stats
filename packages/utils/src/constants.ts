export enum Source {
  webpack = 'webpack',
  lighthouse = 'lighthouse',
  browsertime = 'browsertime',
}

export type SourceData = Record<string, unknown>;

export enum InsightType {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export enum MetricTypeType {
  METRIC_TYPE_NUMERIC = 'METRIC_TYPE_NUMERIC',
  METRIC_TYPE_SCORE = 'METRIC_TYPE_SCORE',
  METRIC_TYPE_FILE_SIZE = 'METRIC_TYPE_FILE_SIZE',
  METRIC_TYPE_DURATION = 'METRIC_TYPE_DURATION',
  METRIC_TYPE_PERCENTAGE = 'METRIC_TYPE_PERCENTAGE',
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
  'HIGH_NEGATIVE' = 'HIGH_NEGATIVE',
  'NEGATIVE' = 'NEGATIVE',
  'LOW_NEGATIVE' = 'LOW_NEGATIVE',
  'NO_CHANGE' = 'NO_CHANGE',
  'LOW_POSITIVE' = 'LOW_POSITIVE',
  'POSITIVE' = 'POSITIVE',
  'HIGH_POSITIVE' = 'HIGH_POSITIVE',
}

export interface MetricRun {
  value: number;
}

export interface MetricRunInfo {
  value: number;
  displayValue: string;
  delta?: number;
  deltaPercentage?: number;
  deltaType?: MetricRunInfoDeltaType;
  displayDelta?: string;
  displayDeltaPercentage?: string;
}

export type JobSection<T = object> = Record<Source, T>;

export enum JobSectionId {
  meta = 'meta',
  insights = 'insights',
  summary = 'summary',
  metrics = 'metrics',
  rawData = 'rawData',
}

export interface JobSummaryItem {
  baseline: number;
  current: number;
}

export interface JobInsight<T = object> {
  type: InsightType;
  data: T & { text?: string };
}

export interface JobInsightAssetsSizeTotalData {
  md: string;
  info: MetricRunInfo;
}
export type JobInsightDuplicatePackagesData = Record<string, Array<string>>;

export interface JobInsightDuplicatePackagesV3Data {
  packages: Record<string, Array<string>>;
}

export interface JobInsightNewPackagesData {
  packages: Array<string>;
}

export type JobSummarySource = Record<string, JobSummaryItem>;
export type JobSummary = JobSection<JobSummarySource>;

export interface JobInsights {
  [Source.webpack]: {
    assetsSizeTotal: JobInsight<JobInsightAssetsSizeTotalData>;
    duplicatePackages?: JobInsight<JobInsightDuplicatePackagesData>;
    duplicatePackagesV3?: JobInsight<JobInsightDuplicatePackagesV3Data>;
    newPackages?: JobInsight<JobInsightNewPackagesData>;
  };
}

export interface JobInsightsInfo {
  duplicatePackages?: JobInsights['webpack']['duplicatePackagesV3'];
  newPackages?: JobInsights['webpack']['newPackages'];
}

export type JobMetricsSource = Record<string, MetricRun | Record<string, MetricRun>>;
export type JobMetrics = JobSection<JobMetricsSource>;

export interface JobData {
  [JobSectionId.meta]?: JobSection;
  [JobSectionId.insights]?: JobInsights;
  [JobSectionId.summary]?: JobSummary;
  [JobSectionId.metrics]?: JobMetrics;
  [JobSectionId.rawData]?: JobSection;
}

export interface Job extends JobData {
  internalBuildNumber: number;
  // @TODO(v5): Remove or move to report
  label: string;
}

export interface LighthouseSource {
  lighthouseVersion: string;
  fetchTime: string;
  requestedUrl: string;
  categories: { [key: string]: { score: number } };
  audits: { [key: string]: { score: number; numericValue: number } };
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

export interface BrowsertimeSourceMetric {
  median: number;
}

export interface BrowsertimeSource {
  info?: {
    browsertime: {
      version: string;
    }
    timestamp: string;
    url: string;
  }
  statistics?: {
    timings: {
      firstPaint: BrowsertimeSourceMetric;
      fullyLoaded: BrowsertimeSourceMetric;
      pageTimings: {
        backEndTime: BrowsertimeSourceMetric;
        domContentLoadedTime: BrowsertimeSourceMetric;
        domInteractiveTime: BrowsertimeSourceMetric;
        domainLookupTime: BrowsertimeSourceMetric;
        frontEndTime: BrowsertimeSourceMetric;
        pageDownloadTime: BrowsertimeSourceMetric;
        pageLoadTime: BrowsertimeSourceMetric;
        redirectionTime: BrowsertimeSourceMetric;
        serverConnectionTime: BrowsertimeSourceMetric;
        serverResponseTime: BrowsertimeSourceMetric;
      }
      paintTiming: {
        'first-contentful-paint': BrowsertimeSourceMetric;
      }
      rumSpeedIndex: BrowsertimeSourceMetric;
    }
    visualmetrics: {
      FirstVisualChange: BrowsertimeSourceMetric;
      LastVisualChange: BrowsertimeSourceMetric;
      PerceptualSpeedIndex: BrowsertimeSourceMetric;
      SpeedIndex: BrowsertimeSourceMetric;
      VisualComplete85: BrowsertimeSourceMetric;
      VisualComplete95: BrowsertimeSourceMetric;
      VisualComplete99: BrowsertimeSourceMetric;
    }
  }
}

export interface BrowsertimeMetrics {
  firstPaint: MetricRun;
  fullyLoaded: MetricRun;
  backEndTime: MetricRun;
  domContentLoadedTime: MetricRun;
  domInteractiveTime: MetricRun;
  domainLookupTime: MetricRun;
  frontEndTime: MetricRun;
  pageDownloadTime: MetricRun;
  pageLoadTime: MetricRun;
  redirectionTime: MetricRun;
  serverConnectionTime: MetricRun;
  serverResponseTime: MetricRun;
  firstContentfulPaint: MetricRun;
  rumSpeedIndex: MetricRun;
  firstVisualChange: MetricRun;
  lastVisualChange: MetricRun;
  perceptualSpeedIndex: MetricRun;
  speedIndex: MetricRun;
  visualComplete85: MetricRun;
  visualComplete95: MetricRun;
  visualComplete99: MetricRun;
}
