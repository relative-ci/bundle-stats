import css from './chart.module.css';

export const RESPONSIVE_CONTAINER_PROPS = {
  minWidth: '320px',
  minHeight: '120px',
  width: '100%',
  height: '100%',
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
