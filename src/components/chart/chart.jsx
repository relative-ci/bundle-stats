import { chunk } from 'lodash';

import COLORS from './chart.colors.json';
import css from './chart.css';

export {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export const RESPONSIVE_CONTAINER_PROPS = {
  minWidth: '320px',
  minHeight: '120px',
  width: '100%',
  height: '100%',
  className: css.root,
};

export const BAR_CHART_PROPS = {
  margin: 0,
};


export const BAR_PROPS = {
  isAnimationActive: false,
};

export const PIE_PROPS = {
  isAnimationActive: false,
};

export const TOOLTIP_PROPS = {
  isAnimationActive: false,
  cursor: { fill: '#FAFAFA' },
  contentClassName: css.tooltip,
};

export const XAXIS_PROPS = {
  stroke: '#A4A4A4',
};

export const YAXIS_PROPS = {
  stroke: '#A4A4A4',
};

export const getColors = (count = 2) => {
  const chunks = chunk(COLORS, Math.round(COLORS.length / count));

  return chunks.map((chunkColors, index) => {
    if (index === 0) {
      return chunkColors[0];
    }

    if (index === chunks.length - 1) {
      return chunkColors[chunkColors.length - 1];
    }

    return chunkColors[Math.floor(chunkColors.length / 2)];
  });
};
