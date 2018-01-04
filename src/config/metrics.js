import convert from 'convert-units';
import { round } from 'lodash';

export const fileSize = (val = 0) => {
  const res = convert(val).from('B').toBest();
  return `${round(res.val, 2)}${res.unit}`;
};

export default {
  webpack: {
    totalSize: {
      label: 'Total Size',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_js: {
      label: 'JS',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_css: {
      label: 'CSS',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_img: {
      label: 'IMG',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_media: {
      label: 'Media',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_font: {
      label: 'Fonts',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_html: {
      label: 'HTML',
      biggerIsBetter: false,
      formatter: fileSize,
    },
    totalSizeByType_other: {
      label: 'Other',
      biggerIsBetter: false,
      formatter: fileSize,
    },
  },
};
