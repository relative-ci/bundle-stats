import { useState } from 'react';

import { MetricsDisplayType } from '../constants';

export const useMetricsDisplayType = () => {
  return useState<MetricsDisplayType>(MetricsDisplayType.TABLE);
};
