import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Icon } from '../../ui/icon';
import { Tooltip } from '../../ui/tooltip';

import css from './budget-info.module.css';

export const BudgetInfo = ({ className = '', budget, metric }) => {
  const rootClassName = cx(css.root, budget.overBudget ? css.over : css.under, className);

  return (
    <Tooltip
      className={rootClassName}
      title={
        <>
          <strong>{metric.label}</strong>
          {` is ${budget.overBudget ? 'over' : 'under'} `}
          {metric.formatter(budget.budget)}
          {` budget`}
        </>
      }
    >
      <Icon
        className={css.icon}
        glyph={budget.overBudget ? Icon.ICONS.ALERT_CIRCLE : Icon.ICONS.CHECK_CIRCLE}
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
    label: PropTypes.string,
    formatter: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
};

BudgetInfo.defaultProps = {
  className: '',
};
