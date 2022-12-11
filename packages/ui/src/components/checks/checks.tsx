import React, { useMemo } from 'react';
import {
  CheckEvaluated,
  CheckResult,
  CheckStatus,
  ConditionOperator,
  getGlobalMetricType,
  MetricRunInfoDeltaType,
} from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { Alert } from '../../ui/alert';
import { Delta } from '../delta';
import { Metric } from '../metric';
// @ts-ignore
import css from './checks.module.css';

const OPERATOR_MAP: Record<ConditionOperator, string> = {
  smallerThanInclusive: 'equal',
  smallerThan: 'bellow',
  equal: 'equal',
  notEqual: 'not equal',
  greaterThan: 'above',
  greaterThanInclusive: 'equal',
};

const VALUE_MAP: Record<string, string> = {
  value: 'to',
  delta: 'by',
  deltaPercentage: 'by',
};

const ALERT_MAP: Record<string, string> = {
  FAILURE: 'danger',
  WARNING: 'warning',
  SUCCESS: 'success',
};

interface CheckMatched extends Omit<CheckEvaluated, 'status'> {
  status: CheckStatus;
}

interface CheckProps extends React.HTMLAttributes<HTMLElement> {
  check: CheckMatched;
}

const Check = (props: CheckProps) => {
  const { check, ...restProps } = props;

  const metricSegments = check.condition.fact.split('.');
  const metricKey = metricSegments.slice(0, -1).join('.');

  const field = metricSegments[metricSegments.length - 1];

  let displayField = '';
  let deltaDisplayField: string;

  switch (field) {
    case 'deltaPercentage':
      displayField = 'relative difference';
      deltaDisplayField = check.data.displayDeltaPercentage as string;
      break;
    case 'delta':
      displayField = 'absolute difference';
      deltaDisplayField = check.data.displayDelta as string;
      break;
    default:
      displayField = 'value';
      deltaDisplayField = check.data.displayDeltaPercentage as string;
  }

  const metric = getGlobalMetricType(metricKey);

  return (
    <Alert kind={ALERT_MAP[check.status]} {...restProps}>
      <p>
        <strong>{metric.label}</strong>
        {` ${displayField} `}
        <Metric inline value={check.data.value} formatter={metric.formatter} className={css.checkMetric}>
          <Delta
            displayValue={deltaDisplayField}
            deltaType={check.data.deltaType as MetricRunInfoDeltaType}
            inverted
            className={css.checkMetricDelta}
          />
        </Metric>
        {` is ${OPERATOR_MAP[check.condition.operator]} `}
        <Metric
          value={check.condition.value}
          formatter={metric.formatter}
          inline
          className={css.checkThreshold}
        />
      </p>
    </Alert>
  );
};

export interface ChecksProps extends React.HTMLAttributes<HTMLElement> {
  checks: Array<CheckResult>;
}

export const Checks = (props: ChecksProps) => {
  const { checks, ...restProps } = props;

  const [matchedChecks] = useMemo(() => {
    const matched: Array<CheckMatched> = [];
    const unmatched: Array<CheckEvaluated> = [];

    checks.forEach((check) => {
      // @ts-expect-error
      if (typeof check.data === 'undefined') {
        return;
      }

      // @ts-expect-error
      if (typeof check.status === 'undefined') {
        return;
      }

      // @ts-expect-error
      if (check.matched === true) {
        matched.push(check as CheckMatched);
        // @ts-expect-error
      } else if (check.matched === false) {
        unmatched.push(check as CheckEvaluated);
      }
    });

    return [matched, unmatched];
  }, [checks]);

  return (
    <Stack space="xxsmall" {...restProps}>
      {matchedChecks.map((check) => (
        <Check check={check} />
      ))}
    </Stack>
  );
};
