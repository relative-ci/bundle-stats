import React, { useCallback } from 'react';
import cx from 'classnames';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
import { HoverCard } from '../../ui/hover-card';
import { Skeleton } from '../../ui/skeleton';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

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

interface SummaryItemProps {
  id: string;

  as?: React.ElementType;
  size?: 'medium' | 'large';

  loading?: boolean;
  data?: {
    current: number;
    baseline: number;
  };

  showMetricDescription?: boolean;
  showDelta?: boolean;
}

export const SummaryItem = ({
  id,
  className = '',
  as: Component = 'div',
  size = 'medium',
  data = undefined,
  loading = false,
  showMetricDescription = false,
  showDelta = true,
  ...restProps
}: SummaryItemProps & React.ComponentProps<'div'>) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getGlobalMetricType(id);
  const runInfo = getMetricRunInfo(metric, current, baseline);
  const showMetricDescriptionTooltip = showMetricDescription && metric?.description;

  const rootClassName = cx(css.root, className, css[size], showDelta && css.showDelta);

  return (
    <Stack space="xxsmall" as={Component} className={rootClassName} {...restProps}>
      <FlexStack space="xxxsmall" alignItems="center" as="h3" className={css.title}>
        <span>{metric.label}</span>

        {showMetricDescriptionTooltip && (
          <HoverCard label={<Icon glyph={Icon.ICONS.HELP} />} className={css.titleIcon}>
            <MetricInfo {...metric} />
          </HoverCard>
        )}
      </FlexStack>

      {!loading ? (
        <Stack>
          <Metric
            className={css.currentMetric}
            value={current}
            formatter={metric.formatter}
            enhanced
            inline
          >
            {showDelta && (
              <Delta
                className={css.delta}
                displayValue={runInfo.displayDeltaPercentage || ''}
                deltaType={runInfo.deltaType || ''}
              />
            )}
          </Metric>
          <Metric className={css.baselineMetric} value={baseline} formatter={metric.formatter} />
        </Stack>
      ) : (
        <Stack>
          <Skeleton as="p" className={cx(css.currentMetric, css.loading)} />
          <Skeleton as="p" className={cx(css.baselineMetric, css.loading)} />
        </Stack>
      )}
    </Stack>
  );
};
