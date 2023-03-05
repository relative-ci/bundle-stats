import {
  METRIC_TYPE_FILE_SIZE,
  METRIC_TYPE_NUMERIC,
  METRIC_TYPE_PERCENTAGE,
} from '../config/metrics';
import { FILE_TYPE_LABELS } from '../config/file-types';
import { Metric } from './types';

export const metrics = {
  [Metric.BUNDLE_SIZE]: {
    label: 'Bundle Size',
    description: 'The total size of the assets processed by the bundler',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_FILE_SIZE,
  },
  [Metric.INITIAL_SIZE_JS]: {
    label: 'Initial JS',
    description: 'The total size of JavaScript initial chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_FILE_SIZE,
  },
  [Metric.INITIAL_SIZE_CSS]: {
    label: 'Initial CSS',
    description: 'The total size of CSS initial chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_FILE_SIZE,
  },
  [Metric.CACHE_INVALIDATION]: {
    label: 'Cache Invalidation',
    description: 'The ratio between the total changed assets and total assets size(Bundle Size)',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_PERCENTAGE,
    biggerIsBetter: false,
  },
  [Metric.CHUNK_COUNT]: {
    label: 'Chunks',
    description: 'The total number of chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  [Metric.ASSET_COUNT]: {
    label: 'Assets',
    description: 'Total number of assets',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  [Metric.MODULE_COUNT]: {
    label: 'Modules',
    description: 'The total number of bundled modules',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  [Metric.DUPLICATE_MODULES_COUNT]: {
    label: 'Duplicate Modules',
    description: 'The total number of module instances bundled into multiple chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  [Metric.DUPLICATE_CODE]: {
    label: 'Duplicate Code',
    description: 'The percentage of total duplicate module size from the total module size',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: METRIC_TYPE_PERCENTAGE,
    biggerIsBetter: false,
  },
  [Metric.PACKAGE_COUNT]: {
    label: 'Packages',
    description: 'The total number of bundled packages',
    url: 'https://relative-ci.com/documentation/metrics-and-data#packages',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  [Metric.DUPLICATE_PACKAGES_COUNT]: {
    label: 'Duplicate Packages',
    description: 'The total number of bundled duplicate package instances',
    url: 'https://relative-ci.com/documentation/metrics-and-data#packages',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  sizes: {
    [Metric.TOTAL_SIZE_JS]: {
      label: FILE_TYPE_LABELS.JS,
      type: METRIC_TYPE_FILE_SIZE,
    },
    [Metric.TOTAL_SIZE_CSS]: {
      label: FILE_TYPE_LABELS.CSS,
      type: METRIC_TYPE_FILE_SIZE,
    },
    [Metric.TOTAL_SIZE_IMG]: {
      label: FILE_TYPE_LABELS.IMG,
      type: METRIC_TYPE_FILE_SIZE,
    },
    [Metric.TOTAL_SIZE_MEDIA]: {
      label: FILE_TYPE_LABELS.MEDIA,
      type: METRIC_TYPE_FILE_SIZE,
    },
    [Metric.TOTAL_SIZE_FONT]: {
      label: FILE_TYPE_LABELS.FONT,
      type: METRIC_TYPE_FILE_SIZE,
    },
    [Metric.TOTAL_SIZE_HTML]: {
      label: FILE_TYPE_LABELS.HTML,
      type: METRIC_TYPE_FILE_SIZE,
    },
    [Metric.TOTAL_SIZE_OTHER]: {
      label: FILE_TYPE_LABELS.OTHER,
      type: METRIC_TYPE_FILE_SIZE,
    },
  },
};
