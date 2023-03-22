import React, { useCallback, useMemo } from 'react';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { RunInfo, RunInfoProps } from '../run-info';
import css from './metric-run-info.module.css';

interface MetricInfoProps {
  description: string;
  url?: string;
}

const MetricHoverCard = ({ description, url }: MetricInfoProps) => {
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
    if (showMetricDescription) {
      return <MetricHoverCard description={metric.description} url={metric.url} />;
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
      {...(showDelta && showBaseline && {
        delta: metricRunInfo.displayDeltaPercentage,
        deltaType: metricRunInfo.deltaType,
      })}
      {...restProps}
    />
  );
};
