import React from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import { METRIC_COMPONENT_LINKS } from '@bundle-stats/utils';

import {
  METRICS_GROUP_ASSETS,
  METRICS_GROUP_MODULES,
  METRICS_GROUP_PACKAGES,
  METRICS_WEBPACK_GENERAL,
} from '../../constants';
import { Box } from '../../layout/box';
import { ComponentLink } from '../component-link';
import { MetricRunInfo, MetricRunInfoProps } from '../metric-run-info';
import css from './summary.module.css';
import { Stack } from '../../layout';

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
    <SummaryItemCustomLink key={metricId} {...componentLink?.link} className={className}>
      <MetricRunInfo
        metricId={metricId}
        current={metricData.current}
        baseline={metricData.baseline}
        showDelta={showDelta}
        showBaseline={showBaseline}
        size={size}
        loading={loading}
      />
    </SummaryItemCustomLink>
  );
};

interface SummaryItemData {
  current: number;
  baseline: number;
}

interface SummaryProps {
  data?: SummaryItemProps['data'];
  loading?: boolean;
  showSummaryItemDelta?: SummaryItemProps['showDelta'];
  showSummaryItemBaseline?: SummaryItemProps['showBaseline'];
  summaryItemLink?: SummaryItemProps['customLink'];
}

export const Summary = ({
  className = '',
  data = null,
  loading = false,
  showSummaryItemDelta = true,
  showSummaryItemBaseline = true,
  summaryItemLink = ComponentLink,
}: SummaryProps & React.ComponentProps<'div'>) => (
  <Box className={cx(css.root, className)}>
    <div className={css.row}>
      <Box outline padding="small" className={css.rowGroup}>
        <div className={css.items}>
          {METRICS_WEBPACK_GENERAL.map((metricId) => (
            <SummaryItem
              key={metricId}
              className={css.item}
              metricId={metricId}
              data={data}
              size="xlarge"
              loading={loading}
              customLink={summaryItemLink}
              showDelta={showSummaryItemDelta}
              showBaseline={showSummaryItemBaseline}
            />
          ))}
        </div>
      </Box>
    </div>
    <div className={css.row}>
      {[METRICS_GROUP_ASSETS, METRICS_GROUP_MODULES, METRICS_GROUP_PACKAGES].map((metricGroup) => (
        <Stack className={css.rowGroup} key={metricGroup.title}>
          <h3 className={css.rowGroupTitle}>{metricGroup.title}</h3>
          <Box outline padding="small">
            <div className={css.items}>
              {metricGroup.metrics.map((metricId) => (
                <SummaryItem
                  key={metricId}
                  className={css.item}
                  metricId={metricId}
                  data={data}
                  size="large"
                  loading={loading}
                  customLink={summaryItemLink}
                  showDelta={showSummaryItemDelta}
                  showBaseline={showSummaryItemBaseline}
                />
              ))}
            </div>
          </Box>
        </Stack>
      ))}
    </div>
  </Box>
);
