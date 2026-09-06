import React, { type ReactNode, useMemo } from 'react';
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

const getMetricParams = (value: string): [string, string?] => {
  const matches = value.match(EXTRACT_VALUE_UNIT_PATTERN);

  if (!matches) {
    return [value];
  }

  return [matches[1], matches[2]];
};

type RunInfoTitleProps = {
  className?: string;
  title?: ReactNode;
  titleHoverCard?: ReactNode;
  titleTooltip?: ReactNode;
};

const RunInfoTitle = ({ className, title, titleHoverCard, titleTooltip }: RunInfoTitleProps) => (
  <FlexStack space="xxxsmall" alignItems="center" as="h3" className={cx(css.title, className)}>
    <span className={css.titleText}>{title}</span>
    {titleHoverCard && (
      <HoverCard
        label={<Icon glyph={Icon.ICONS.HELP} />}
        className={cx(css.titleIcon, css.titleHoverCardIcon)}
      >
        {titleHoverCard}
      </HoverCard>
    )}
    {titleTooltip && (
      <Tooltip title={titleTooltip} className={cx(css.titleIcon, css.titleTooltipIcon)}>
        <Icon glyph={Icon.ICONS.HELP} />
      </Tooltip>
    )}
  </FlexStack>
);

type RunInfoContentProps = {
  className?: string;
  loading?: boolean;
  current?: ReactNode;
  enhance?: boolean;
  baseline?: string;
  delta?: string;
  deltaPercentage?: string;
  deltaType?: string;
  showBaseline?: boolean;
  showDelta?: boolean;
};

const RunInfoContent = ({
  className,
  loading = false,
  current = '',
  enhance = false,
  baseline = '',
  delta = '',
  deltaPercentage = '',
  deltaType = '',
  showBaseline = true,
  showDelta = true,
}: RunInfoContentProps) => {
  const currentValueParams: [ReactNode, string?] = useMemo(() => {
    if (!enhance || typeof current !== 'string') {
      return [current];
    }

    return getMetricParams(current);
  }, [current, enhance]);

  const contentClassName = cx(css.content, className);

  if (loading) {
    return (
      <Stack space="xxsmall" className={contentClassName}>
        <Stack space="xxxsmall">
          <Skeleton className={css.currentMetric} />
          {showBaseline && <Skeleton className={css.baselineMetric} />}
        </Stack>
        {showDelta && <Skeleton as="p" className={css.delta} />}
      </Stack>
    );
  }

  return (
    <Stack space="xxsmall" className={contentClassName}>
      <Stack space="xxxsmall">
        <Metric
          value={currentValueParams[0]}
          unit={currentValueParams[1]}
          className={css.currentMetric}
        />
        {showBaseline && (
          <FlexStack alignItems="center" space="xxxsmall" className={css.baselineMetric}>
            <span className={css.baselineMetricLabel}>vs</span>
            <Metric value={baseline} inline className={css.baselineMetricValue} />
          </FlexStack>
        )}
      </Stack>
      {showDelta && (
        <div className={css.delta}>
          {deltaPercentage && (
            <Delta
              displayValue={deltaPercentage}
              deltaType={deltaType}
              className={css.deltaValue}
            />
          )}
          {delta && <Delta displayValue={delta} deltaType={deltaType} className={css.deltaValue} />}
        </div>
      )}
    </Stack>
  );
};

export type RunInfoProps = Pick<RunInfoTitleProps, 'title' | 'titleHoverCard' | 'titleTooltip'> &
  Pick<
    RunInfoContentProps,
    | 'current'
    | 'baseline'
    | 'delta'
    | 'deltaPercentage'
    | 'deltaType'
    | 'showBaseline'
    | 'showDelta'
    | 'loading'
    | 'enhance'
  > & {
    as?: React.ElementType;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
  };

export const RunInfo = ({
  className = '',
  title = null,
  titleHoverCard = null,
  titleTooltip = null,
  current = '',
  baseline = '',
  delta = '',
  deltaPercentage = '',
  deltaType = '',
  as: Component = 'div',
  size = 'medium',
  showBaseline = true,
  showDelta = true,
  loading = false,
  enhance = false,
  children,
  ...restProps
}: RunInfoProps & Omit<React.ComponentProps<'div'>, 'title'>) => {
  const rootClassName = cx(css.root, loading && css.loading, css[size], className);

  return (
    <Component className={rootClassName} {...restProps}>
      <Stack space="xsmall">
        {title && (
          <RunInfoTitle title={title} titleHoverCard={titleHoverCard} titleTooltip={titleTooltip} />
        )}
        <RunInfoContent
          loading={loading}
          current={current}
          enhance={enhance}
          baseline={baseline}
          delta={delta}
          deltaPercentage={deltaPercentage}
          deltaType={deltaType}
          showBaseline={showBaseline}
          showDelta={showDelta}
        />
        {children}
      </Stack>
    </Component>
  );
};
