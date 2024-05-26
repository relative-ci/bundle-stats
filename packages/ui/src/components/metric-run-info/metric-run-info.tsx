import React, { type MouseEvent, useCallback, useMemo } from 'react';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';
import { Focusable } from 'ariakit/focusable';

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
  // The component parent can be rendered inside a link or a button
  // use a focusable element with onClick to prevent DOM issues (a > button, a > a, etc)
  const onClick = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      if (!url) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.open(url);
    },
    [url],
  );

  return (
    <Stack space="xxsmall" className={css.metricHoverCard}>
      <h3 className={css.metricHoverCardTitle}>{title}</h3>
      <Stack space="xxxsmall">
        <p className={css.metricHoverCardDescription}>{description}</p>
        {url && (
          <div>
            <Focusable as="span" onClick={onClick} className={css.readMoreLink}>
              <FlexStack alignItems="center" space="xxxsmall">
                <span>Learn more</span>
                <Icon glyph={Icon.ICONS.EXTERNAL_LINK} size="small" />
              </FlexStack>
            </Focusable>
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

  const deltaProps = useMemo(() => {
    if (!showDelta || metric.skipDelta || !('delta' in metricRunInfo)) {
      return {};
    }

    return {
      delta: metricRunInfo.displayDeltaPercentage,
      deltaType: metricRunInfo.deltaType,
    };
  }, [metricRunInfo]);

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
      {...deltaProps}
      {...restProps}
    />
  );
};
