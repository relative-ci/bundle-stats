import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { Icon } from '../../ui/icon';
import { Tooltip } from '../../ui/tooltip';

import css from './budget-info.module.css';

export const BudgetInfo = ({ className = '', budget, metric }) => {
  const rootClassName = cx(css.root, budget.failed ? css.over : css.under, className);

  return (
    <Tooltip
      className={rootClassName}
      title={
        <>
          <strong>{metric.label}</strong>
          {` is ${budget.failed ? 'over' : 'under'} `}
          {metric.formatter(budget.budgetValue)}
          {` budget`}
        </>
      }
    >
      <Icon
        className={css.icon}
        glyph={budget.failed ? Icon.ICONS.ALERT_CIRCLE : Icon.ICONS.CHECK_CIRCLE}
        size="medium"
      />
    </Tooltip>
  );
};

BudgetInfo.propTypes = {
  budget: PropTypes.shape({
    currentValue: PropTypes.number,
    budgetValue: PropTypes.number,
    failed: PropTypes.bool,
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
