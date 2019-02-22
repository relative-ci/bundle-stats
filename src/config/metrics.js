import {
  formatNumber,
  formatDuration,
  formatFileSize,
  formatPercentage,
} from '../utils/format';

export const METRIC_TYPE_FILE_SIZE = 'METRIC_TYPE_FILE_SIZE';
export const METRIC_TYPE_DURATION = 'METRIC_TYPE_DURATION';
export const METRIC_TYPE_NUMERIC = 'METRIC_TYPE_NUMERIC';
export const METRIC_TYPE_SCORE = 'METRIC_TYPE_SCORE';
export const METRIC_TYPE_PERCENTAGE = 'METRIC_TYPE_PERCENTAGE';

export const METRIC_TYPES = {
  [METRIC_TYPE_NUMERIC]: {
    biggerIsBetter: false,
    formatter: formatNumber,
  },
  [METRIC_TYPE_SCORE]: {
    biggerIsBetter: true,
    formatter: formatNumber,
  },
  [METRIC_TYPE_DURATION]: {
    biggerIsBetter: false,
    formatter: formatDuration,
  },
  [METRIC_TYPE_FILE_SIZE]: {
    biggerIsBetter: false,
    formatter: formatFileSize,
  },
  [METRIC_TYPE_PERCENTAGE]: {
    biggerIsBetter: true,
    formatter: formatPercentage,
  },
};

const METRICS = {
  webpack: {
    assets: {
      totalSizeByTypeALL: {
        label: 'Total Size',
        type: METRIC_TYPE_FILE_SIZE,
      },
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
      totalInitialSizeJS: {
        label: 'Initial JS',
        type: METRIC_TYPE_FILE_SIZE,
      },
      totalInitialSizeCSS: {
        label: 'Initial CSS',
        type: METRIC_TYPE_FILE_SIZE,
      },
    },
    cacheInvalidation: {
      label: 'Cache Invalidation',
      type: METRIC_TYPE_PERCENTAGE,
      biggerIsBetter: false,
    },
    modulesCount: {
      label: 'Modules Count',
      type: METRIC_TYPE_NUMERIC,
      biggerIsBetter: false,
    },
    chunksCount: {
      label: 'Chunks Count',
      type: METRIC_TYPE_NUMERIC,
      biggerIsBetter: false,
    },
    assetsCount: {
      label: 'Assets Count',
      type: METRIC_TYPE_NUMERIC,
      biggerIsBetter: false,
    },
  },
  lighthouse: {
    score: {
      label: 'Score',
      type: METRIC_TYPE_SCORE,
    },
    speedIndex: {
      label: 'Perceptual Speed Index',
      type: METRIC_TYPE_DURATION,
    },
    firstMeaningfulPain: {
      label: 'First Meaningful Paint',
      type: METRIC_TYPE_DURATION,
    },
    timeToFirstByte: {
      label: 'Time To First Byte',
      type: METRIC_TYPE_DURATION,
    },
    firstInteractive: {
      label: 'First Interactive',
      type: METRIC_TYPE_DURATION,
    },
    totalByteWeight: {
      label: 'Total Weight',
      type: METRIC_TYPE_FILE_SIZE,
    },
    domSize: {
      label: 'DOM Size',
      type: METRIC_TYPE_NUMERIC,
    },
  },
  browsertime: {
    firstPaint: {
      label: 'First Paint',
      type: METRIC_TYPE_DURATION,
    },
    fullyLoaded: {
      label: 'Fully Loaded',
      type: METRIC_TYPE_DURATION,
    },
    backEndTime: {
      label: 'BackEnd Time',
      type: METRIC_TYPE_DURATION,
    },
    domContentLoadedTime: {
      label: 'DOM Content Loaded Time',
      type: METRIC_TYPE_DURATION,
    },
    domInteractiveTime: {
      label: 'DOM Interactive Time',
      type: METRIC_TYPE_DURATION,
    },
    domainLookupTime: {
      label: 'Domain Lookup Time',
      type: METRIC_TYPE_DURATION,
    },
    frontEndTime: {
      label: 'FrontEnd Time',
      type: METRIC_TYPE_DURATION,
    },
    pageDownloadTime: {
      label: 'Page Download Time',
      type: METRIC_TYPE_DURATION,
    },
    pageLoadTime: {
      label: 'Page Load Time',
      type: METRIC_TYPE_DURATION,
    },
    redirectionTime: {
      label: 'Redirection Time',
      type: METRIC_TYPE_DURATION,
    },
    serverConnectionTime: {
      label: 'Server Connection Time',
      type: METRIC_TYPE_DURATION,
    },
    serverResponseTime: {
      label: 'Server Response Time',
      type: METRIC_TYPE_DURATION,
    },
    firstContentfulPaint: {
      label: 'First Contentful Paint',
      type: METRIC_TYPE_DURATION,
    },
    rumSpeedIndex: {
      label: 'RUM Speed Index',
      type: METRIC_TYPE_DURATION,
    },
    firstVisualChange: {
      label: 'First Visual Change',
      type: METRIC_TYPE_DURATION,
    },
    lastVisualChange: {
      label: 'Last Visual Change',
      type: METRIC_TYPE_DURATION,
    },
    perceptualSpeedIndex: {
      label: 'Perceptual SpeedIndex',
      type: METRIC_TYPE_DURATION,
    },
    speedIndex: {
      label: 'Speed Index',
      type: METRIC_TYPE_DURATION,
    },
    visualComplete85: {
      label: 'Visual Complete 85',
      type: METRIC_TYPE_DURATION,
    },
    visualComplete95: {
      label: 'Visual Complete 95',
      type: METRIC_TYPE_DURATION,
    },
    visualComplete99: {
      label: 'Visual Complete 99',
      type: METRIC_TYPE_DURATION,
    },
  },
};

export default METRICS;
