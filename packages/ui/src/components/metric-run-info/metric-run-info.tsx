import React, { useCallback, useMemo } from 'react';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Icon } from '../../ui/icon';
import { RunInfo, RunInfoProps } from '../run-info';
import css from './metric-run-info.module.css';

interface MetricInfoProps {
  title: string;
  description?: string;
  url?: string;
}

const MetricHoverCard = ({ title, description, url }: MetricInfoProps) => {
  // The component parent can be rendered inside a link, use button to avoid using nested links
  const onClick = useCallback(() => {
    if (url) {
      window.open(url);
    }
  }, [url]);

  return (
    <Stack space="xxsmall" className={css.metricHoverCard}>
      <h3 className={css.metricHoverCardTitle}>{title}</h3>
      <Stack space="xxxsmall">
        <p className={css.metricHoverCardDescription}>{description}</p>
        {url && (
          <div>
            <button type="button" onClick={onClick} className={css.readMoreLink}>
              <FlexStack alignItems="center" space="xxxsmall">
                <span>Read more</span>
                <Icon glyph={Icon.ICONS.EXTERNAL_LINK} size="small" />
              </FlexStack>
            </button>
          </div>
        )}
      </Stack>
    </Stack>
  );
};

export interface MetricRunInfoProps {
  metricId: string;
  current: number;
  baseline?: number;
  showDelta?: boolean;
  showMetricDescription?: boolean;
  showBaseline?: boolean;
  size?: RunInfoProps['size'];
  loading?: RunInfoProps['loading'];
}

export const MetricRunInfo = (props: MetricRunInfoProps & React.ComponentProps<'div'>) => {
  const {
    metricId,
    current,
    baseline = 0,
    showDelta = true,
    showMetricDescription = true,
    showBaseline = true,
    ...restProps
  } = props;

  const metric = getGlobalMetricType(metricId);
  const metricRunInfo = getMetricRunInfo(metric, current, baseline || 0);

  const titleHoverCard = useMemo(() => {
    if (showMetricDescription && (metric.description || metric.url)) {
      return (
        <MetricHoverCard title={metric.label} description={metric.description} url={metric.url} />
      );
    }

    return null;
  }, [showMetricDescription, metric]);

  return (
    <RunInfo
      title={metric.label}
      titleHoverCard={titleHoverCard}
      enhance
      current={metricRunInfo.displayValue}
      showBaseline={showBaseline}
      {...(showBaseline && {
        baseline: metric.formatter(baseline),
      })}
      {...(showDelta &&
        !metric.skipDelta && {
          delta: metricRunInfo.displayDeltaPercentage,
          deltaType: metricRunInfo.deltaType,
        })}
      {...restProps}
    />
  );
};
