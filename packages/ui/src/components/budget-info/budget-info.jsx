import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { InsightType } from '@bundle-stats/utils';

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

export const BudgetInfo = ({ className = '', budgetInsight }) => {
  const { className: insightTypeClassName, glyph } = INSIGHT_TYPE_MAP[budgetInsight.type];

  const rootClassName = cx(css.root, insightTypeClassName, className);

  return (
    <Tooltip className={rootClassName} title={budgetInsight.message.text}>
      <Icon className={css.icon} glyph={glyph} size="medium" />
    </Tooltip>
  );
};

BudgetInfo.propTypes = {
  budgetInsight: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.shape({
      text: PropTypes.string,
    }),
    data: PropTypes.shape({
      currentValue: PropTypes.number,
      budgetValue: PropTypes.number,
      failed: PropTypes.bool,
    }),
  }).isRequired,
  className: PropTypes.string,
};

BudgetInfo.defaultProps = {
  className: '',
};
