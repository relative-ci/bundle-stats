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
    totalSizeByTypeALL: {
      ...FILE_SIZE_METRIC,
      label: 'Total Size',
    },
    totalSizeByTypeJS: {
      ...FILE_SIZE_METRIC,
      label: 'JS',
    },
    totalSizeByTypeCSS: {
      ...FILE_SIZE_METRIC,
      label: 'CSS',
    },
    totalSizeByTypeIMG: {
      ...FILE_SIZE_METRIC,
      label: 'IMG',
    },
    totalSizeByTypeMEDIA: {
      ...FILE_SIZE_METRIC,
      label: 'Media',
    },
    totalSizeByTypeFONT: {
      ...FILE_SIZE_METRIC,
      label: 'Fonts',
    },
    totalSizeByTypeHTML: {
      ...FILE_SIZE_METRIC,
      label: 'HTML',
    },
    totalSizeByTypeOTHER: {
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
