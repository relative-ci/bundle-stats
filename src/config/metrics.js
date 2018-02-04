import convert from 'convert-units';
import { round } from 'lodash';

export const fileSize = (val) => {
  const res = convert(val).from('B').toBest();
  return `${round(res.val, 2)}${res.unit}`;
};

const FILE_SIZE_METRIC = {
  biggerIsBetter: false,
  formatter: (val) => {
    const res = convert(val).from('B').toBest();
    return `${round(res.val, 2)}${res.unit}`;
  },
};

const DURATION_METRIC = {
  biggerIsBetter: false,
  formatter: (val) => {
    const res = convert(val).from('ms').toBest();
    return `${round(res.val, 4)}${res.unit}`;
  },
};

const NUMERIC_METRIC = {
  biggerIsBetter: true,
  formatter: val => val,
};

export default {
  webpack: {
    totalSize: {
      ...FILE_SIZE_METRIC,
      label: 'Total Size',
    },
    totalSizeByType_js: {
      ...FILE_SIZE_METRIC,
      label: 'JS',
    },
    totalSizeByType_css: {
      ...FILE_SIZE_METRIC,
      label: 'CSS',
    },
    totalSizeByType_img: {
      ...FILE_SIZE_METRIC,
      label: 'IMG',
    },
    totalSizeByType_media: {
      ...FILE_SIZE_METRIC,
      label: 'Media',
    },
    totalSizeByType_font: {
      ...FILE_SIZE_METRIC,
      label: 'Fonts',
    },
    totalSizeByType_html: {
      ...FILE_SIZE_METRIC,
      label: 'HTML',
    },
    totalSizeByType_other: {
      ...FILE_SIZE_METRIC,
      label: 'Other',
    },
  },

  lighthouse: {
    score: {
      ...NUMERIC_METRIC,
      label: 'Score',
    },
    'time-to-first-byte': {
      ...DURATION_METRIC,
      label: 'Time to first byte',
    },
    'performance-score': {
      ...NUMERIC_METRIC,
      label: 'Performance Score',
    },
  },
};
