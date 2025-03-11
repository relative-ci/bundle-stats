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

export interface RunInfoProps {
  title?: ReactNode;
  titleHoverCard?: ReactNode;
  titleTooltip?: ReactNode;
  current?: ReactNode;
  baseline?: string;
  delta?: string;
  deltaPercentage?: string;
  deltaType?: string;

  as?: React.ElementType;
  size?: 'small' | 'medium' | 'large' | 'xlarge';

  showBaseline?: boolean;
  loading?: boolean;
  enhance?: boolean;
}

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
  loading = false,
  enhance = false,
  ...restProps
}: RunInfoProps & Omit<React.ComponentProps<'div'>, 'title'>) => {
  const rootClassName = cx(
    css.root,
    className,
    css[size],
    (delta || deltaPercentage) && css.showDelta,
  );

  const currentValueParams: [ReactNode, string?] = useMemo(() => {
    if (!enhance || typeof current !== 'string') {
      return [current];
    }

    return getMetricParams(current);
  }, [current, enhance]);

  return (
    <Component className={rootClassName} {...restProps}>
      {title && (
        <FlexStack space="xxxsmall" alignItems="center" as="h3" className={css.title}>
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
      )}

      {!loading ? (
        <Stack space="xxxsmall" className={css.info}>
          <Metric
            value={currentValueParams[0]}
            unit={currentValueParams[1]}
            inline
            className={css.currentMetric}
          >
            {(delta || deltaPercentage) && (
              <span className={css.delta}>
                {deltaPercentage && (
                  <Delta
                    displayValue={deltaPercentage}
                    deltaType={deltaType}
                    className={css.deltaValue}
                  />
                )}
                {delta && (
                  <Delta displayValue={delta} deltaType={deltaType} className={css.deltaValue} />
                )}
              </span>
            )}
          </Metric>
          {showBaseline && <Metric className={css.baselineMetric} value={baseline} />}
        </Stack>
      ) : (
        <Stack space="xxxsmall" className={css.info}>
          <Skeleton as="p" className={cx(css.currentMetric, css.loading)} />
          {showBaseline && <Skeleton as="p" className={cx(css.baselineMetric, css.loading)} />}
        </Stack>
      )}
    </Component>
  );
};
