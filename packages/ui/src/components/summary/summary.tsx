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

interface SummaryItemProps {
  metricId: string;
  data?: Record<string, SummaryItemData> | null;
  customLink: React.ElementType;
  size?: MetricRunInfoProps['size'];
  loading: boolean;
  showDelta: boolean;
  showBaseline: boolean;
}

const SummaryItem = (props: SummaryItemProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    metricId,
    data,
    customLink: SummaryItemCustomLink,
    size,
    loading,
    showDelta,
    showBaseline,
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
        showDelta={showDelta && componentLink?.showDelta}
        showBaseline={showBaseline}
        size={size}
        loading={loading}
      />
    </Box>
  );
};

interface SummaryItemData {
  current: number;
  baseline: number;
}

interface SummaryProps {
  size?: MetricRunInfoProps['size'];
  keys?: Array<string>;
  data?: SummaryItemProps['data'];
  loading?: boolean;
  showSummaryItemDelta?: SummaryItemProps['showDelta'];
  showSummaryItemBaseline?: SummaryItemProps['showBaseline'];
  summaryItemLink?: SummaryItemProps['customLink'];
}

export const Summary = ({
  className = '',
  size = 'medium',
  keys = METRICS_WEBPACK_GENERAL,
  data = null,
  loading = false,
  showSummaryItemDelta = true,
  showSummaryItemBaseline = true,
  summaryItemLink = ComponentLink,
}: SummaryProps & React.ComponentProps<'div'>) => (
  <Box className={cx(css.root, className)}>
    <div className={css.items}>
        {keys.map((metricId) => (
          <SummaryItem
            key={metricId}
            className={css.item}
            metricId={metricId}
            data={data}
            customLink={summaryItemLink}
            size={size}
            loading={loading}
            showDelta={showSummaryItemDelta}
            showBaseline={showSummaryItemBaseline}
          />
        ))}
      </div>
  </Box>
);
