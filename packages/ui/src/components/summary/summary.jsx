import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'lodash/get';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';

import { METRICS_WEBPACK_GENERAL } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { ComponentLink } from '../component-link';
import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

export const Summary = ({
  className,
  size,
  keys,
  data,
  loading,
  showSummaryItemDelta,
  summaryItemLink: SummaryItemCustomLink,
}) => (
  <Box className={cx(css.root, className)}>
    <FlexStack space="small" className={css.items}>
      {Array.from(METRIC_COMPONENT_LINKS)
        .filter(([metricId]) => keys.includes(metricId))
        .map(([metricId, metricOptions]) => (
          <Box
            key={metricId}
            outline
            padding="small"
            as={SummaryItemCustomLink}
            {...metricOptions.link}
            className={css.item}
          >
            <SummaryItem
              size={size}
              id={metricId}
              data={get(data, metricId)}
              loading={loading}
              showMetricDescription
              showDelta={showSummaryItemDelta && metricOptions.showDelta !== false}
            />
          </Box>
        ))}
    </FlexStack>
  </Box>
);

Summary.defaultProps = {
  className: '',
  data: null,
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
  data: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      baseline: PropTypes.number,
      current: PropTypes.number,
    }),
  }),
  loading: PropTypes.bool,
  showSummaryItemDelta: PropTypes.bool,
  summaryItemLink: PropTypes.elementType,
};
