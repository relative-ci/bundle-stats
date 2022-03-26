import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';

import { Box } from '../../layout/box';
import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Alert } from '../../ui/alert';
import { Icon } from '../../ui/icon';
import { ComponentLink } from '../component-link';
import css from './budget-insights.module.css';

const Budget = (props) => {
  const { className, metricId, budget, CustomLink } = props;
  const componentLinkOptions = METRIC_COMPONENT_LINKS.get(metricId);

  return (
    <CustomLink className={cx(css.budget, className)} {...componentLinkOptions?.link}>
      {budget.message.text}
    </CustomLink>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
  metricId: PropTypes.string.isRequired,
  budget: PropTypes.shape({
    message: PropTypes.shape({
      text: PropTypes.string,
    }),
    data: PropTypes.shape({
      currentValue: PropTypes.number.isRequired,
      budgetValue: PropTypes.number.isRequired,
      failed: PropTypes.bool.isRequired,
    }),
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

const BUDGET_ALERT_KIND = new Map([
  ['ERROR', 'danger'],
  ['WARNING', 'warning'],
  ['SUCCESS', 'success'],
]);

const BUDGET_ICON = new Map([
  ['ERROR', Icon.ICONS.ALERT_CIRCLE],
  ['WARNING', Icon.ICONS.WARNING],
  ['SUCCESS', Icon.ICONS.CHECK_CIRCLE],
]);

export const BudgetInsights = (props) => {
  const { className, source, budgets, CustomLink } = props;
  const [showBudgets, setShowBudgets] = useState(false);

  const iconGlyph = BUDGET_ICON.get(budgets.type);
  const alertKind = BUDGET_ALERT_KIND.get(budgets.type);
  const rootClassName = cx(css.group, className, css[`group-${alertKind}`]);

  return (
    <Alert kind={alertKind} padding="none" className={rootClassName}>
      <Box
        padding={['xsmall', 'small']}
        className={css.groupHeader}
        as="button"
        type="button"
        onClick={() => setShowBudgets(!showBudgets)}
      >
        <FlexStack space="xxsmall" className={css.groupTitle}>
          {iconGlyph && <Icon className={css.groupIcon} glyph={iconGlyph} />}
          <span>{budgets.message.text}</span>
          <span className={css.groupTitleToggle}>{showBudgets ? 'hide' : 'show'} all</span>
        </FlexStack>
      </Box>

      {showBudgets && (
        <Box padding={['xsmall', 'small']} className={css.groupContent}>
          <Stack space="none">
            {Object.entries(budgets.data).map(([key, budget]) => (
              <Budget
                key={key}
                metricId={`${source}.${key}`}
                budget={budget}
                CustomLink={CustomLink}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Alert>
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
