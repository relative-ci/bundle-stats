import React, { ReactNode } from 'react';
import cx from 'classnames';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { HoverCard } from '../../ui/hover-card';
import { Table } from '../../ui/table';
import css from './metric-change-legend.module.css';
import { Separator } from '../../layout';

type ChangeKind = 'improvement' | 'regression' | 'neutral' | 'no-change';
type ChangeKindVariant = 'low' | 'medium' | 'high';

type BarProps = {
  className?: string;
  kind: ChangeKind;
  variants: ChangeKindVariant[];
  size?: 'medium' | 'large';
};

const Variants = (props: BarProps) => {
  const { className, kind, variants, size = 'medium' } = props;

  return (
    <span className={cx(css.variants, css[`bar-${kind}`], css[size], className)}>
      {variants.map((variant) => (
        <span key={variant} className={cx(css.variant, css[`variant-${variant}`])} />
      ))}
    </span>
  );
};

type ChangeMagnitudeInfoProps = {
  kind: 'improvement' | 'regression';
  impact: string;
};

const ChangeMagnitudeInfo = (props: ChangeMagnitudeInfoProps) => {
  const { kind, impact } = props;

  return (
    <Stack space="small">
      <p>
        Changes flagged as <strong>{kind}s</strong> have a {impact} impact on user performance.
      </p>
      <p>
        The report shows different intensity colors depending on the magnitude of the percentage
        change.
      </p>
      <Stack space="xxsmall">
        <Separator />
        <FlexStack alignItems="center" space="xxsmall">
          <Variants kind={kind} variants={['low']} size="large" />
          Change is smaller or equal than <strong>5%</strong>
        </FlexStack>
        <Separator />
        <FlexStack alignItems="center" space="xxsmall">
          <Variants kind={kind} variants={['medium']} size="large" />
          Change is smaller or equal than <strong>50%</strong>
        </FlexStack>
        <Separator />
        <FlexStack alignItems="center" space="xxsmall">
          <Variants kind={kind} variants={['high']} size="large" />
          Change is larger than <strong>50%</strong>
        </FlexStack>
      </Stack>
    </Stack>
  );
};

const ImprovementInfo = () => <ChangeMagnitudeInfo kind="improvement" impact="positive" />;
const RegressionInfo = () => <ChangeMagnitudeInfo kind="regression" impact="negative" />;

const NeutralInfo = () => (
  <Stack space="small">
    <p>
      <strong>Neutral</strong> changes do not have a clear positive or negative impact on user
      performance.
    </p>
  </Stack>
);

const NoChangeInfo = () => (
  <Stack space="small">
    <p>
      The metric value is <strong>unchanged</strong> between the compared builds.
    </p>
  </Stack>
);

type ChangeConfig = {
  id: ChangeKind;
  label: string;
  variants: ChangeKindVariant[];
  info: ReactNode;
};

const ITEMS: ChangeConfig[] = [
  {
    id: 'improvement',
    label: 'Improvement',
    variants: ['low', 'medium', 'high'],
    info: <ImprovementInfo />,
  },
  {
    id: 'regression',
    label: 'Regression',
    variants: ['low', 'medium', 'high'],
    info: <RegressionInfo />,
  },
  {
    id: 'neutral',
    label: 'Neutral',
    variants: ['medium'],
    info: <NeutralInfo />,
  },
  {
    id: 'no-change',
    label: 'No change',
    variants: ['medium'],
    info: <NoChangeInfo />,
  },
];

export interface MetricChangeLegendProps extends React.ComponentProps<'div'> {}

export const MetricChangeLegend = (props: MetricChangeLegendProps) => {
  const { className, ...restProps } = props;

  return (
    <FlexStack inline space="small" className={cx(css.root, className)} {...restProps}>
      {ITEMS.map(({ id, variants, label, info }) => (
        <HoverCard
          key={id}
          anchorClassName={css.itemAnchor}
          label={
            <FlexStack inline alignItems="center" space="xxsmall" className={css.item}>
              <Variants kind={id} variants={variants} />
              <span>{label}</span>
            </FlexStack>
          }
        >
          {info}
        </HoverCard>
      ))}
    </FlexStack>
  );
};
