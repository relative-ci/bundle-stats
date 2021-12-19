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
  'HIGH_POSITIVE',
}

export interface MetricRun {
  value: number;
}

export interface MetricRunInfo {
  value: number;
  displayValue: string;
  delta?: number;
  displayDelta?: string;
  displayDeltaPercentage?: string;
  deltaType?: MetricRunInfoDeltaType;
}

export interface Metric {
  value: number;
}

export interface ModuleMetric extends Metric {
  name: string;
  chunkIds: Array<String>;
}

export interface PackageMetric extends Metric {
  path: string;
}

export interface WebpackMetricsModules {
  metrics: {
    modules: Record<string, ModuleMetric>;
  };
}

export interface WebpackMetricsPackages {
  metrics: {
    packages: Record<string, PackageMetric>;
  };
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

export enum InsightType {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}
