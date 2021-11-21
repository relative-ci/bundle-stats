import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
import { Popover } from '../../ui/popover';
import { Tooltip } from '../../ui/tooltip';
import { Skeleton } from '../../ui/skeleton';
import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

const MetricInfoPopover = ({ description, url }) => {
  // Workaround cases where the parent is a link
  const readMoreOnClick = () => {
    window.open(url);
  };

  return (
    <Stack space="xxxsmall">
      <p>{description}</p>
      {url && (
        <p>
          <button type="button" className={css.readMoreBtn} onClick={readMoreOnClick}>
            Read more
          </button>
        </p>
      )}
    </Stack>
  );
};

MetricInfoPopover.propTypes = {
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
};

MetricInfoPopover.defaultProps = {
  url: '',
};

const BudgetInfo = ({ className = '', budget, metric }) => {
  const rootClassName = cx(
    css.budgetIcon,
    budget.overBudget ? css.budgetIconWarning : css.budgetIconSuccess,
    className,
  );

  return (
    <Tooltip
      className={rootClassName}
      title={
        <>
          {`Value is ${budget.overBudget ? 'over' : 'under'} `}
          {metric.formatter(budget.budget)}
          {` budget`}
        </>
      }
    >
      <Icon
        glyph={budget.overBudget ? Icon.ICONS.WARNING : Icon.ICONS.CHECK_CIRCLE}
        size="medium"
      />
    </Tooltip>
  );
};

BudgetInfo.propTypes = {
  budget: PropTypes.shape({
    value: PropTypes.number,
    budget: PropTypes.number,
    overBudget: PropTypes.bool,
  }).isRequired,
  metric: PropTypes.shape({
    formatter: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
};

BudgetInfo.defaultProps = {
  className: '',
};

export const SummaryItem = ({
  className,
  as: Component,
  size,
  id,
  data,
  loading,
  showDelta,
  showMetricDescription,
  budget,
  ...props
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getGlobalMetricType(id);
  const runInfo = getMetricRunInfo(metric, current, baseline);
  const showMetricDescriptionTooltip = showMetricDescription && metric?.description;

  const rootClassName = cx(
    css.root,
    className,
    css[size],
    showDelta && css.showDelta,
    budget?.overBudget && css.budgetOver,
    budget?.overBudget === false && css.budgetUnder,
  );

  return (
    <Stack space="xxsmall" as={Component} className={rootClassName} {...props}>
      <FlexStack as="h3" space="xxxsmall" className={css.title}>
        <span className={css.titleLabel}>{metric.label}</span>

        {showMetricDescriptionTooltip && (
          <Popover className={css.icon} icon="help">
            <MetricInfoPopover {...metric} />
          </Popover>
        )}

        {budget && <BudgetInfo className={css.budgetInfo} metric={metric} budget={budget} />}
      </FlexStack>

      {!loading ? (
        <Stack>
          <Metric
            className={css.currentMetric}
            value={current}
            formatter={metric.formatter}
            enhanced
            inline
          >
            {showDelta && (
              <Delta
                className={css.delta}
                displayValue={runInfo.displayDeltaPercentage}
                deltaType={runInfo.deltaType}
              />
            )}
          </Metric>
          <Metric className={css.baselineMetric} value={baseline} formatter={metric.formatter} />
        </Stack>
      ) : (
        <Stack>
          <Skeleton className={cx(css.currentMetric, css.loading)} />
          <Skeleton className={cx(css.baselineMetric, css.loading)} />
        </Stack>
      )}
    </Stack>
  );
};

SummaryItem.defaultProps = {
  className: '',
  as: 'div',
  data: null,
  size: 'medium',
  loading: false,
  showMetricDescription: false,
  showDelta: true,
  budget: undefined,
};

SummaryItem.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Custom component */
  as: PropTypes.elementType,

  /** Size modifier */
  size: PropTypes.oneOf(['medium', 'large']),

  /** Metric id */
  id: PropTypes.string.isRequired,

  /** Loading flag */
  loading: PropTypes.bool,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Show description */
  showMetricDescription: PropTypes.bool,

  /** Show delta */
  showDelta: PropTypes.bool,

  /** Budget data */
  budget: PropTypes.shape({
    value: PropTypes.number,
    budget: PropTypes.number,
    overBudget: PropTypes.bool,
  }),
};
