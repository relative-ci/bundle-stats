import React, { useMemo } from 'react';
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
  title?: string;
  titleHoverCard?: React.ReactNode;
  titleTooltip?: React.ReactNode;
  current?: React.ReactNode;
  baseline?: string;
  delta?: string;
  deltaType?: string;

  as?: React.ElementType;
  size?: 'small' | 'medium' | 'large';

  showBaseline?: boolean;
  loading?: boolean;
  enhance?: boolean;
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
  showBaseline = true,
  loading = false,
  enhance = false,
  ...restProps
}: RunInfoProps & React.ComponentProps<'div'>) => {
  const rootClassName = cx(css.root, className, css[size], delta && css.showDelta);

  const currentValueParams: [React.ReactNode, string?] = useMemo(() => {
    if (!enhance || typeof current !== 'string') {
      return [current];
    }

    return getMetricParams(current);
  }, [current, enhance]);

  return (
    <Component className={rootClassName} {...restProps}>
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
        <Stack className={css.info}>
          <Metric
            className={css.currentMetric}
            value={currentValueParams[0]}
            unit={currentValueParams[1]}
            inline
          >
            {delta && <Delta className={css.delta} displayValue={delta} deltaType={deltaType} />}
          </Metric>
          {showBaseline && <Metric className={css.baselineMetric} value={baseline} />}
        </Stack>
      ) : (
        <Stack className={css.info}>
          <Skeleton as="p" className={cx(css.currentMetric, css.loading)} />
          {showBaseline && <Skeleton as="p" className={cx(css.baselineMetric, css.loading)} />}
        </Stack>
      )}
    </Component>
  );
};
