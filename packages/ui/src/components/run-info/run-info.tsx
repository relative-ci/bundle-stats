import React from 'react';
import cx from 'classnames';

import { Icon } from '../../ui/icon';
import { HoverCard } from '../../ui/hover-card';
import { Tooltip } from '../../ui/tooltip';
import { Skeleton } from '../../ui/skeleton';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './run-info.module.css';

// Separate value and unit
const EXTRACT_VALUE_UNIT_PATTERN = /([\d|.|,| ]*)(\w*|%)$/;

const getMetricParams = (value: string) => {
  const matches = value.match(EXTRACT_VALUE_UNIT_PATTERN);

  if (!matches) {
    return { value, unit: '' };
  }

  return {
    value: matches[1],
    unit: matches[2],
  };
};

export interface RunInfoProps {
  title?: string;
  titleHoverCard?: React.ReactNode;
  titleTooltip?: React.ReactNode;
  current?: string;
  baseline?: string;
  delta?: string;
  deltaType?: string;

  as?: React.ElementType;
  size?: 'medium' | 'large';

  loading?: boolean;
}

export const RunInfo = ({
  className = '',
  title = '',
  titleHoverCard = null,
  titleTooltip = null,
  current = '',
  baseline = '',
  delta = '',
  deltaType = '',
  as: Component = 'div',
  size = 'medium',
  loading = false,
  ...restProps
}: RunInfoProps & React.ComponentProps<'div'>) => {
  const metricParams = getMetricParams(current);
  const rootClassName = cx(css.root, className, css[size], delta && css.showDelta);

  return (
    <Stack space="xxsmall" as={Component} className={rootClassName} {...restProps}>
      {title && (
        <FlexStack space="xxxsmall" alignItems="center" as="h3" className={css.title}>
          <span>{title}</span>
          {titleHoverCard && (
            <HoverCard label={<Icon glyph={Icon.ICONS.HELP} />} className={css.titleIcon}>
              {titleHoverCard}
            </HoverCard>
          )}
          {titleTooltip && (
            <Tooltip title={titleTooltip} className={css.titleIcon}>
              <Icon glyph={Icon.ICONS.HELP} />
            </Tooltip>
          )}
        </FlexStack>
      )}

      {!loading ? (
        <Stack>
          <Metric
            className={css.currentMetric}
            value={metricParams.value}
            unit={metricParams.unit}
            inline
          >
            {delta && <Delta className={css.delta} displayValue={delta} deltaType={deltaType} />}
          </Metric>
          <Metric className={css.baselineMetric} value={baseline} />
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
