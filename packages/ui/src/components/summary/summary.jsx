import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';

import { METRICS_WEBPACK_GENERAL } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { ComponentLink } from '../component-link';
import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

const getSourceMetricId = (fullMetricId) => fullMetricId.split('.').slice(1).join('.');

export const Summary = ({
  className,
  size,
  keys,
  data,
  budgets,
  loading,
  showSummaryItemDelta,
  summaryItemLink: SummaryItemCustomLink,
}) => (
  <Box outline className={cx(css.root, className)}>
    <FlexStack className={css.items}>
      {Array.from(METRIC_COMPONENT_LINKS)
        .filter(([metricId]) => keys.includes(getSourceMetricId(metricId)))
        .map(([metricId, metricOptions]) => (
          <SummaryItem
            key={metricId}
            className={css.item}
            as={SummaryItemCustomLink}
            {...metricOptions.link}
            size={size}
            id={metricId}
            data={get(data, metricId)}
            budget={get(budgets, getSourceMetricId(metricId))}
            loading={loading}
            showMetricDescription
            showDelta={showSummaryItemDelta && metricOptions.showDelta !== false}
          />
        ))}
    </FlexStack>
  </Box>
);

Summary.defaultProps = {
  className: '',
  data: null,
  budgets: null,
  loading: false,
  size: '',
  keys: METRICS_WEBPACK_GENERAL,
  showSummaryItemDelta: true,
  summaryItemLink: ComponentLink,
};

Summary.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  budgets: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  loading: PropTypes.bool,
  showSummaryItemDelta: PropTypes.bool,
  summaryItemLink: PropTypes.elementType,
};
