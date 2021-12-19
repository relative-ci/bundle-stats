import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { InsightType } from '@bundle-stats/utils';
import * as budgetsInsightsTransformer from '@bundle-stats/utils/lib-esm/transformers/budgets-insights';

import { Icon } from '../../ui/icon';
import { Tooltip } from '../../ui/tooltip';

import css from './budget-info.module.css';

const INSIGHT_TYPE_MAP = {
  [InsightType.SUCCESS]: {
    className: css.success,
    glyph: Icon.ICONS.CHECK_CIRCLE,
  },
  [InsightType.ERROR]: {
    className: css.error,
    glyph: Icon.ICONS.ALERT_CIRCLE,
  },
  [InsightType.WARNING]: {
    className: css.warning,
    glyph: Icon.ICONS.WARNING,
  },
};

export const BudgetInfo = ({ className = '', metricId, budgetInsight }) => {
  const budgetInsightInfo = budgetsInsightsTransformer.getInfo(metricId, budgetInsight);
  const { className: insightTypeClassName, glyph } = INSIGHT_TYPE_MAP[budgetInsightInfo.type];

  const rootClassName = cx(css.root, insightTypeClassName, className);
  const { data: messageData } = budgetInsightInfo.message;

  return (
    <Tooltip
      className={rootClassName}
      title={
        <>
          <strong>{messageData.metricLabel}</strong>
          {` value (`}
          <strong>{messageData.currentValue}</strong>
          {`) is ${messageData.diffLabel} `}
          <strong>{messageData.budgetValue}</strong>
          {` budget `}
        </>
      }
    >
      <Icon className={css.icon} glyph={glyph} size="medium" />
    </Tooltip>
  );
};

BudgetInfo.propTypes = {
  metricId: PropTypes.string.isRequired,
  budgetInsight: PropTypes.shape({
    currentValue: PropTypes.number,
    budgetValue: PropTypes.number,
    failed: PropTypes.bool,
  }).isRequired,
  className: PropTypes.string,
};

BudgetInfo.defaultProps = {
  className: '',
};
