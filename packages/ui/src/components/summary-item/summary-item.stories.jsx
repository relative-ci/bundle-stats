import React from 'react';

import { SummaryItem } from './summary-item';

export default {
  title: 'Components/SummaryItem',
  component: SummaryItem,
};

export const Standard = () => (
  <SummaryItem
    loading={false}
    id="webpack.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 100 * 1000,
    }}
  />
);

export const SizeLarge = () => (
  <SummaryItem
    size="large"
    loading={false}
    id="webpack.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 100 * 1000,
    }}
  />
);

export const ShowMetricDescription = () => (
  <SummaryItem
    loading={false}
    id="webpack.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 100 * 1000,
    }}
    showMetricDescription
  />
);

export const ShowDeltaFalse = () => (
  <SummaryItem
    loading={false}
    id="webpack.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 0,
    }}
    showDelta={false}
  />
);

export const Loading = () => <SummaryItem loading id="webpack.totalSizeByTypeALL" />;
