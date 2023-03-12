import React from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';

import { METRICS_WEBPACK_GENERAL } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { ComponentLink } from '../component-link';
import { SummaryItem, SummaryItemProps } from '../summary-item';
import css from './summary.module.css';

interface SummaryProps {
  size?: SummaryItemProps['size'];
  keys?: Array<string>;
  data?: Record<string, SummaryItemProps['data']> | null;
  loading?: boolean;
  showSummaryItemDelta?: boolean;
  summaryItemLink?: React.ElementType;
}

export const Summary = ({
  className = '',
  size = 'medium',
  keys = METRICS_WEBPACK_GENERAL,
  data = null,
  loading = false,
  showSummaryItemDelta = false,
  summaryItemLink: SummaryItemCustomLink = ComponentLink,
}: SummaryProps & React.ComponentProps<'div'>) => (
  <Box className={cx(css.root, className)}>
    <FlexStack space="small" className={css.items}>
      {keys.map((metricId) => {
        const componentLink = METRIC_COMPONENT_LINKS.get(metricId);

        return (
          <Box
            key={metricId}
            outline
            outlineHover
            padding="small"
            as={SummaryItemCustomLink}
            {...componentLink?.link}
            className={css.item}
          >
            <SummaryItem
              size={size}
              id={metricId}
              data={get(data, metricId)}
              loading={loading}
              showMetricDescription
              showDelta={showSummaryItemDelta && componentLink?.showDelta !== false}
            />
          </Box>
        );
      })}
    </FlexStack>
  </Box>
);
