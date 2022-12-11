import React from 'react';
import { CheckResult, CheckStatus, MetricRunInfoDeltaType } from '@bundle-stats/utils';

import { Checks } from '.';

export default {
  title: 'Components/Checks',
  comonent: Checks,
};

const CHECKS: Array<CheckResult> = [
  {
    condition: {
      fact: 'webpack.duplicatePackagesCount.delta',
      operator: 'greaterThan',
      value: 0,
    },
    value: 2,
    data: {
      value: 4,
      displayValue: '4',
      delta: 2,
      displayDelta: '+2',
      deltaPercentage: 50,
      deltaType: MetricRunInfoDeltaType.HIGH_NEGATIVE,
      displayDeltaPercentage: '+50%',
    },
    matched: true,
    status: CheckStatus.FAILURE,
  },
  {
    condition: {
      fact: 'webpack.duplicatePackagesCount.value',
      operator: 'greaterThan',
      value: 0,
    },
    value: 2,
    data: {
      value: 2,
      displayValue: '2',
      delta: 0,
      displayDelta: '0',
      deltaType: MetricRunInfoDeltaType.NO_CHANGE,
      deltaPercentage: 0,
      displayDeltaPercentage: '0%',
    },
    matched: true,
    status: CheckStatus.WARNING,
  },
  {
    condition: {
      fact: 'webpack.packageCount.delta',
      operator: 'greaterThan',
      value: 0,
    },
    value: 10,
    data: {
      value: 10,
      displayValue: '1',
      delta: 1,
      displayDelta: '+1',
      deltaType: MetricRunInfoDeltaType.NEGATIVE,
      deltaPercentage: 10,
      displayDeltaPercentage: '+10%',
    },
    matched: true,
    status: CheckStatus.WARNING,
  },
  {
    condition: {
      fact: 'webpack.totalSizeByTypeALL.delta',
      operator: 'greaterThan',
      value: 5 * 1024,
    },
    value: 0,
    data: {
      value: 1048576,
      displayValue: '1MiB',
      delta: 10 * 1024,
      displayDelta: '+10KiB',
      deltaType: MetricRunInfoDeltaType.NEGATIVE,
      deltaPercentage: 1,
      displayDeltaPercentage: '+1%',
    },
    matched: true,
    status: CheckStatus.WARNING,
  },
];

export const Default = () => <Checks checks={CHECKS} />;
