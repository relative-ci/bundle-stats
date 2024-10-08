import { FILE_TYPE_LABELS } from '../config/file-types';
import { Metric } from './types';
import { MetricTypes, MetricConfig } from '../constants';

type WebpackMetrics = Partial<Record<Metric, MetricConfig>> & {
  sizes: Partial<Record<Metric, MetricConfig>>;
};

export const metrics: WebpackMetrics = {
  [Metric.BUNDLE_SIZE]: {
    label: 'Bundle Size',
    description: 'Total file size of the assets generated or processed by the bundler',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: MetricTypes.FileSize,
  },
  [Metric.INITIAL_SIZE_JS]: {
    label: 'Initial JS',
    description: 'Total file size of the JavaScript initial chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: MetricTypes.FileSize,
  },
  [Metric.INITIAL_SIZE_CSS]: {
    label: 'Initial CSS',
    description: 'Total file size of the CSS initial chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: MetricTypes.FileSize,
  },
  [Metric.CACHE_INVALIDATION]: {
    label: 'Cache Invalidation',
    description:
      'Ratio between the total file size of the changed assets and the total file size(Bundle Size)',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: MetricTypes.Percentage,
    biggerIsBetter: null,
    skipDelta: true,
  },
  [Metric.CHUNK_COUNT]: {
    label: 'Chunks',
    description: 'Total number of chunks generated by the bundler',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: MetricTypes.Numeric,
    biggerIsBetter: null,
  },
  [Metric.ASSET_COUNT]: {
    label: 'Assets',
    description: 'Total number of assets generated or produced by the bundler',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: MetricTypes.Numeric,
    biggerIsBetter: null,
  },
  [Metric.MODULE_COUNT]: {
    label: 'Modules',
    description: 'Total number of bundled modules',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: MetricTypes.Numeric,
    biggerIsBetter: null,
  },
  [Metric.DUPLICATE_MODULES_COUNT]: {
    label: 'Duplicate Modules',
    description: 'Total number of modules included into more than one chunk',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: MetricTypes.Numeric,
    biggerIsBetter: false,
  },
  [Metric.DUPLICATE_CODE]: {
    label: 'Duplicate Code',
    description: 'The percentage of total duplicate module size from the total module size',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: MetricTypes.Percentage,
    biggerIsBetter: null,
  },
  [Metric.PACKAGE_COUNT]: {
    label: 'Packages',
    description: 'The total number of bundled packages',
    url: 'https://relative-ci.com/documentation/metrics-and-data#packages',
    type: MetricTypes.Numeric,
    biggerIsBetter: false,
  },
  [Metric.DUPLICATE_PACKAGES_COUNT]: {
    label: 'Duplicate Packages',
    description: 'The total number of duplicate bundled packages',
    url: 'https://relative-ci.com/documentation/metrics-and-data#packages',
    type: MetricTypes.Numeric,
    biggerIsBetter: false,
  },
  sizes: {
    [Metric.TOTAL_SIZE_JS]: {
      label: FILE_TYPE_LABELS.JS,
      type: MetricTypes.FileSize,
    },
    [Metric.TOTAL_SIZE_CSS]: {
      label: FILE_TYPE_LABELS.CSS,
      type: MetricTypes.FileSize,
    },
    [Metric.TOTAL_SIZE_IMG]: {
      label: FILE_TYPE_LABELS.IMG,
      type: MetricTypes.FileSize,
    },
    [Metric.TOTAL_SIZE_MEDIA]: {
      label: FILE_TYPE_LABELS.MEDIA,
      type: MetricTypes.FileSize,
    },
    [Metric.TOTAL_SIZE_FONT]: {
      label: FILE_TYPE_LABELS.FONT,
      type: MetricTypes.FileSize,
    },
    [Metric.TOTAL_SIZE_HTML]: {
      label: FILE_TYPE_LABELS.HTML,
      type: MetricTypes.FileSize,
    },
    [Metric.TOTAL_SIZE_OTHER]: {
      label: FILE_TYPE_LABELS.OTHER,
      type: MetricTypes.FileSize,
    },
  },
};
