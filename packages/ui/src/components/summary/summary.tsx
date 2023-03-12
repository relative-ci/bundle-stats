import React, { useCallback } from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import { METRIC_COMPONENT_LINKS, getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { METRICS_WEBPACK_GENERAL } from '../../constants';
import { Box } from '../../layout/box';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { ComponentLink } from '../component-link';
import { SummaryItem, SummaryItemProps } from '../summary-item';
import css from './summary.module.css';

interface MetricInfoProps {
  description: string;
  url?: string;
}

const MetricInfo = ({ description, url }: MetricInfoProps) => {
  // The component parent can be rendered inside a link, use button to avoid using nested links
  const onClick = useCallback(() => {
    if (url) {
      window.open(url);
    }
  }, [url]);

  return (
    <Stack space="xxxsmall">
      <p>{description}</p>
      {url && (
        <p>
          <button type="button" onClick={onClick} className={css.readMoreLink}>
            Read more
          </button>
        </p>
      )}
    </Stack>
  );
};

interface SummaryItemData {
  current: number;
  baseline: number;
}

interface SummaryProps {
  size?: SummaryItemProps['size'];
  keys?: Array<string>;
  data?: Record<string, SummaryItemData> | null;
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
  showSummaryItemDelta = true,
  summaryItemLink: SummaryItemCustomLink = ComponentLink,
}: SummaryProps & React.ComponentProps<'div'>) => (
  <Box className={cx(css.root, className)}>
    <FlexStack space="small" className={css.items}>
      {keys.map((metricId) => {
        const componentLink = METRIC_COMPONENT_LINKS.get(metricId);

        const metricData = get(data, metricId, { current: 0, baseline: 0 });
        const metric = getGlobalMetricType(metricId);
        const metricRunInfo = getMetricRunInfo(metric, metricData.current, metricData.baseline);

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
              title={metric.label}
              titleHoverCard={<MetricInfo description={metric.description} url={metric.url} />}
              current={metricRunInfo.displayValue}
              baseline={metric.formatter(metricData.baseline)}
              size={size}
              loading={loading}
              {...(showSummaryItemDelta && componentLink?.showDelta !== false && {
                delta: metricRunInfo.displayDeltaPercentage,
                deltaType: metricRunInfo.deltaType,
              })}
            />
          </Box>
        );
      })}
    </FlexStack>
  </Box>
);
