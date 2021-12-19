import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';
import * as budgetsInsightsTransformer from '@bundle-stats/utils/lib-esm/transformers/budgets-insights';

import { Box } from '../../layout/box';
import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Alert } from '../../ui/alert';
import { Icon } from '../../ui/icon';
import { ComponentLink } from '../component-link';
import css from './budget-insights.module.css';

const Budget = (props) => {
  const { className, metricId, budgetInsight, CustomLink } = props;
  const componentLinkOptions = METRIC_COMPONENT_LINKS.get(metricId);
  const budgetInsightInfo = budgetsInsightsTransformer.getInfo(metricId, budgetInsight);
  const { data: messageData } = budgetInsightInfo.message;

  return (
    <CustomLink className={cx(css.budget, className)} {...componentLinkOptions?.link}>
      <strong>{messageData.metricLabel}</strong>
      {` value (`}
      <strong>{messageData.currentValue}</strong>
      {`) is ${messageData.diffLabel} `}
      <strong>{messageData.budgetValue}</strong>
      {` budget `}
    </CustomLink>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
  metricId: PropTypes.string.isRequired,
  budgetInsight: PropTypes.shape({
    currentValue: PropTypes.number.isRequired,
    budgetValue: PropTypes.number.isRequired,
    failed: PropTypes.bool.isRequired,
  }).isRequired,
  CustomLink: PropTypes.elementType.isRequired,
};

Budget.defaultProps = {
  className: '',
};

const BudgetsGroup = (props) => {
  const { className, kind, source, budgets, CustomLink } = props;
  const [showBudgets, setShowBudgets] = useState(false);

  const isFailed = kind === 'danger';

  return (
    <Alert kind={kind} padding="none" className={cx(css.group, css[kind], className)}>
      <Box
        padding={['xsmall', 'small']}
        className={css.groupHeader}
        as="button"
        type="button"
        onClick={() => setShowBudgets(!showBudgets)}
      >
        <FlexStack space="xxsmall" className={css.groupTitle}>
          <Icon
            className={css.groupIcon}
            glyph={isFailed ? Icon.ICONS.ALERT_CIRCLE : Icon.ICONS.CHECK_CIRCLE}
          />
          <span>
            <strong>{budgets.length}</strong>
            {` budget ${budgets.length > 1 ? 'checks' : 'check'} ${isFailed ? 'failed' : 'passed'}`}
          </span>
          <span className={css.groupTitleToggle}>{showBudgets ? 'hide' : 'show'} all</span>
        </FlexStack>
      </Box>

      {showBudgets && (
        <Box padding={['xsmall', 'small']} className={css.groupContent}>
          <Stack space="none">
            {budgets.map(([key, budget]) => (
              <Budget
                key={key}
                metricId={`${source}.${key}`}
                budgetInsight={budget}
                CustomLink={CustomLink}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Alert>
  );
};

BudgetsGroup.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(['success', 'danger']).isRequired,
  source: PropTypes.string.isRequired,
  budgets: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  CustomLink: PropTypes.elementType.isRequired,
};

BudgetsGroup.defaultProps = {
  className: '',
};

export const BudgetInsights = (props) => {
  const { className, source, budgets, CustomLink } = props;

  const [failedBudgets, passedBudgets] = useMemo(() => {
    const passed = [];
    const failed = [];

    Object.entries(budgets).forEach(([key, budget]) => {
      if (budget.failed) {
        failed.push([key, budget]);
      } else {
        passed.push([key, budget]);
      }
    });

    return [failed, passed];
  }, [budgets]);

  return (
    <Stack className={className} space="xsmall">
      {failedBudgets.length > 0 && (
        <BudgetsGroup
          kind="danger"
          source={source}
          budgets={failedBudgets}
          CustomLink={CustomLink}
        />
      )}

      {passedBudgets.length > 0 && (
        <BudgetsGroup
          kind="success"
          source={source}
          budgets={passedBudgets}
          CustomLink={CustomLink}
        />
      )}
    </Stack>
  );
};

BudgetInsights.propTypes = {
  className: PropTypes.string,
  source: PropTypes.string.isRequired,
  budgets: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  CustomLink: PropTypes.elementType,
};

BudgetInsights.defaultProps = {
  className: '',
  CustomLink: ComponentLink,
};
