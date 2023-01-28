import React, { useMemo } from 'react';
import {
  BudgetEvaluated,
  BudgetResult,
  BudgetStatus,
  ConditionOperator,
  MetricRunInfoDeltaType,
  getGlobalMetricType,
} from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { Alert } from '../../ui/alert';
import { Delta } from '../delta';
import { Metric } from '../metric';
// @ts-ignore
import css from './budgets.module.css';

const OPERATOR_MAP: Record<ConditionOperator, string> = {
  smallerThanInclusive: 'equal',
  smallerThan: 'bellow',
  equal: 'equal',
  notEqual: 'not equal',
  greaterThan: 'above',
  greaterThanInclusive: 'equal',
};

const ALERT_MAP: Record<string, string> = {
  FAILURE: 'danger',
  WARNING: 'warning',
  SUCCESS: 'success',
};

interface BudgetProps extends React.HTMLAttributes<HTMLElement> {
  budget: BudgetEvaluated;
}

const Budget = (props: BudgetProps) => {
  const { budget, ...restProps } = props;

  const metricSegments = budget.config.condition.fact.split('.');
  const metricKey = metricSegments.slice(0, -1).join('.');

  const field = metricSegments[metricSegments.length - 1];

  let displayField = '';
  let deltaDisplayField: string;

  switch (field) {
    case 'deltaPercentage':
      displayField = 'relative difference';
      deltaDisplayField = budget.data.displayDeltaPercentage as string;
      break;
    case 'delta':
      displayField = 'absolute difference';
      deltaDisplayField = budget.data.displayDelta as string;
      break;
    default:
      displayField = 'value';
      deltaDisplayField = budget.data.displayDeltaPercentage as string;
  }

  const metric = getGlobalMetricType(metricKey);

  return (
    <Alert kind={ALERT_MAP[budget.config.status]} {...restProps}>
      <p>
        <strong>{metric.label}</strong>
        {` ${displayField} `}
        <Metric inline value={budget.data.value} formatter={metric.formatter} className={css.checkMetric}>
          <Delta
            displayValue={deltaDisplayField}
            deltaType={budget.data.deltaType as MetricRunInfoDeltaType}
            inverted
            className={css.checkMetricDelta}
          />
        </Metric>
        {` is ${OPERATOR_MAP[budget.config.condition.operator]} `}
        <Metric
          value={budget.config.condition.value}
          formatter={metric.formatter}
          inline
          className={css.checkThreshold}
        />
      </p>
    </Alert>
  );
};

export interface BudgetsProps extends React.HTMLAttributes<HTMLElement> {
  budgets: Array<BudgetResult>;
}

export const Budgets = (props: BudgetsProps) => {
  const { budgets, ...restProps } = props;

  const [matchedBudgets] = useMemo(() => {
    const matched: Array<BudgetEvaluated> = [];
    const unmatched: Array<BudgetEvaluated> = [];

    budgets.forEach((budget) => {
      // @ts-expect-error
      if (typeof budget.data === 'undefined') {
        return;
      }

      // @ts-expect-error
      if (typeof budget.matched === 'undefined') {
        return;
      }

      // @ts-expect-error
      if (budget.matched === true) {
        matched.push(budget as BudgetEvaluated);
        // @ts-expect-error
      } else if (budget.matched === false) {
        unmatched.push(budget as BudgetEvaluated);
      }
    });

    return [matched, unmatched];
  }, [budgets]);

  return (
    <Stack space="xxsmall" {...restProps}>
      {matchedBudgets.map((budget) => (
        <Budget budget={budget} />
      ))}
    </Stack>
  );
};
