import {
  METRIC_TYPE_FILE_SIZE,
  METRIC_TYPE_NUMERIC,
  METRIC_TYPE_PERCENTAGE,
} from '../config/metrics';

export const metrics = {
  totalSizeByTypeALL: {
    label: 'Bundle Size',
    description: 'The total size of the assets produced by webpack',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_FILE_SIZE,
  },
  totalInitialSizeJS: {
    label: 'Initial JS',
    description: 'The total size of JavaScript initial chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_FILE_SIZE,
  },
  totalInitialSizeCSS: {
    label: 'Initial CSS',
    description: 'The total size of CSS initial chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_FILE_SIZE,
  },
  cacheInvalidation: {
    label: 'Cache Invalidation',
    description: 'The ratio between the total changed assets and total assets size(Bundle Size)',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_PERCENTAGE,
    biggerIsBetter: false,
  },
  chunkCount: {
    label: 'Chunks',
    description: 'The total number of chunks',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  assetCount: {
    label: 'Assets',
    description: 'Total number of assets',
    url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  moduleCount: {
    label: 'Modules',
    description: 'The total number of modules bundled by webpack',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  duplicateModulesCount: {
    label: 'Duplicate Modules',
    description: 'The total number of modules that belong to more than one chunk',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  duplicateCode: {
    label: 'Duplicate Code',
    description: 'The percentage of total duplicate module size from the total module size',
    url: 'https://relative-ci.com/documentation/metrics-and-data#modules-1',
    type: METRIC_TYPE_PERCENTAGE,
    biggerIsBetter: false,
  },
  packageCount: {
    label: 'Packages',
    description: 'The total number of packages bundled by webpack',
    url: 'https://relative-ci.com/documentation/metrics-and-data#packages',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  duplicatePackagesCount: {
    label: 'Duplicate Packages',
    description: 'The total number of duplicate packages',
    url: 'https://relative-ci.com/documentation/metrics-and-data#packages',
    type: METRIC_TYPE_NUMERIC,
    biggerIsBetter: false,
  },
  sizes: {
    totalSizeByTypeJS: {
      label: 'JS',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeCSS: {
      label: 'CSS',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeIMG: {
      label: 'IMG',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeMEDIA: {
      label: 'Media',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeFONT: {
      label: 'Fonts',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeHTML: {
      label: 'HTML',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeOTHER: {
      label: 'Other',
      type: METRIC_TYPE_FILE_SIZE,
    },
  },
};
