import React, { useCallback } from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';

import { METRICS_WEBPACK_GENERAL } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { ComponentLink } from '../component-link';
import { MetricRunInfo, MetricRunInfoProps } from '../metric-run-info';
import css from './summary.module.css';

interface SummaryItemData {
  current: number;
  baseline: number;
}

interface SummaryProps {
  size?: MetricRunInfoProps['size'];
  keys?: Array<string>;
  data?: Record<string, SummaryItemData> | null;
  loading?: boolean;
  showSummaryItemDelta?: boolean;
  summaryItemLink?: React.ElementType;
}

interface SummaryItemProps {
  metricId: string;
  data?: SummaryProps['data'];
  summaryItemLink: SummaryProps['summaryItemLink'];
  size: SummaryProps['size'];
  loading: SummaryProps['loading'];
  showSummaryItemDelta: SummaryProps['showSummaryItemDelta'];
}

const SummaryItem = (props: SummaryItemProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    metricId,
    data,
    summaryItemLink: SummaryItemCustomLink,
    size,
    loading,
    showSummaryItemDelta,
  } = props;

  const componentLink = METRIC_COMPONENT_LINKS.get(metricId);
  const metricData = get(data, metricId, { current: 0, baseline: 0 });

  return (
    <Box
      key={metricId}
      outline
      outlineHover
      padding="small"
      as={SummaryItemCustomLink}
      {...componentLink?.link}
      className={className}
    >
      <MetricRunInfo
        metricId={metricId}
        current={metricData.current}
        baseline={metricData.baseline}
        showDelta={showSummaryItemDelta && componentLink?.showDelta}
        size={size}
        loading={loading}
      />
    </Box>
  );
};

export const Summary = ({
  className = '',
  size = 'medium',
  keys = METRICS_WEBPACK_GENERAL,
  data = null,
  loading = false,
  showSummaryItemDelta = true,
  summaryItemLink = ComponentLink,
}: SummaryProps & React.ComponentProps<'div'>) => (
  <Box className={cx(css.root, className)}>
    <FlexStack space="small" className={css.items}>
      {keys.map((metricId) => (
        <SummaryItem
          key={metricId}
          className={css.item}
          metricId={metricId}
          data={data}
          summaryItemLink={summaryItemLink}
          size={size}
          loading={loading}
          showSummaryItemDelta={showSummaryItemDelta}
        />
      ))}
    </FlexStack>
  </Box>
);
