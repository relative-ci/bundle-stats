export enum ModuleMetric {
  SIZE = 'value',
  DUPLICATE_SIZE = 'duplicateSize',
  TOTAL_SIZE = 'totalSize',
}

export const ModuleMetrics = {
  [ModuleMetric.SIZE]: {
    label: 'Size',
  },
  [ModuleMetric.TOTAL_SIZE]: {
    label: 'Total size',
  },
  [ModuleMetric.DUPLICATE_SIZE]: {
    label: 'Duplicate size',
  },
};
