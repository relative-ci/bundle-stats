import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { HoverCard } from '../../ui/hover-card';
import { Skeleton } from '../../ui/skeleton';
import { Stack } from '../../layout/stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

const MetricInfo = ({ description, url }) => {
  // The component parent can be rendered inside an anchor tag, using button
  // to avoid using nesting links
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

MetricInfo.propTypes = {
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
};

MetricInfo.defaultProps = {
  url: '',
};

export const SummaryItem = ({
  className,
  as: Component,
  size,
  id,
  data,
  loading,
  showDelta,
  showMetricDescription,
  ...props
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getGlobalMetricType(id);
  const runInfo = getMetricRunInfo(metric, current, baseline);
  const showMetricDescriptionTooltip = showMetricDescription && metric?.description;

  const rootClassName = cx(css.root, className, css[size], showDelta && css.showDelta);

  return (
    <Stack space="xxsmall" as={Component} className={rootClassName} {...props}>
      <h3 className={css.title}>
        {showMetricDescriptionTooltip ? (
          <HoverCard label={metric.label}>
            <MetricInfo {...metric} />
          </HoverCard>
        ) : (
          metric.label
        )}
      </h3>

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
                displayValue={runInfo.displayDeltaPercentage}
                deltaType={runInfo.deltaType}
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

SummaryItem.defaultProps = {
  className: '',
  as: 'div',
  data: null,
  size: 'medium',
  loading: false,
  showMetricDescription: false,
  showDelta: true,
};

SummaryItem.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Custom component */
  as: PropTypes.elementType,

  /** Size modifier */
  size: PropTypes.oneOf(['medium', 'large']),

  /** Metric id */
  id: PropTypes.string.isRequired,

  /** Loading flag */
  loading: PropTypes.bool,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Show description */
  showMetricDescription: PropTypes.bool,

  /** Show delta */
  showDelta: PropTypes.bool,
};
