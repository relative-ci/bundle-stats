import React from 'react';

import { AssetNotPredictive } from '.';

export default {
  title: 'Components/AssetNotPredictive',
  component: AssetNotPredictive,
};

export const Default = () => <AssetNotPredictive />;

const RUNS = [
  {
    name: 'static/vendor.abcd1234.js',
    value: 1024 * 1024 - 1,
  },
  {
    name: 'static/vendor.abcd1234.js',
    value: 1024 * 1024,
  },
] as any;

export const WithRuns = () => <AssetNotPredictive runs={RUNS} labels={['Job 2', 'Job 1']} />;
