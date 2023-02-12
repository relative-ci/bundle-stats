import React from 'react';
import cx from 'classnames';
import {
  BUNDLE_PACKAGES_DUPLICATE,
  BUNDLE_PACKAGES_COUNT,
  InsightType,
  JobInsight,
  JobInsights as JobInsightsType,
} from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Icon } from '../../ui/icon';
import { ComponentLink } from '../component-link';
// @ts-ignore
import css from './insights.module.css';

interface InsightEntry {
  name: string;
  insight: JobInsight;
  link: any;
}

const normalizedInsights = ({
  duplicatePackages,
  newPackages,
}: Partial<JobInsightsType['webpack']>): Array<InsightEntry> => {
  const insightsByLevel: Record<InsightType, Array<InsightEntry>> = {
    [InsightType.ERROR]: [],
    [InsightType.WARNING]: [],
    [InsightType.INFO]: [],
  };

  if (duplicatePackages) {
    insightsByLevel[duplicatePackages.type].push({
      name: 'duplicatePackages',
      insight: duplicatePackages,
      link: BUNDLE_PACKAGES_DUPLICATE,
    });
  }

  if (newPackages) {
    insightsByLevel[newPackages.type].push({
      name: 'newPackages',
      insight: newPackages,
      link: BUNDLE_PACKAGES_COUNT,
    });
  }

  return [
    ...(insightsByLevel[InsightType.ERROR] || []),
    ...(insightsByLevel[InsightType.WARNING] || []),
    ...(insightsByLevel[InsightType.INFO] || []),
  ];
};

const InsightTypeIconMap = new Map([
  [InsightType.ERROR, Icon.ICONS.ERROR],
  [InsightType.WARNING, Icon.ICONS.WARNING],
  [InsightType.INFO, Icon.ICONS.INFO],
]);

interface InsightsProps extends React.HTMLAttributes<HTMLDivElement> {
  duplicatePackages: any;
  newPackages: any;
  customComponentLink?: React.ElementType;
}

export const Insights = (props: InsightsProps) => {
  const {
    duplicatePackages,
    newPackages,
    customComponentLink: CustomComponentLink = ComponentLink,
    ...restProps
  } = props;

  const insights = normalizedInsights({ duplicatePackages, newPackages });

  return (
    <Stack space="xxsmall" {...restProps}>
      {insights.map(({ name, insight, link }) => {
        const glyph = InsightTypeIconMap.get(insight.type);
        const { text } = insight.data as { text: string };

        return (
          <FlexStack
            key={name}
            space="xxsmall"
            alignItems="center"
            as={CustomComponentLink}
            {...link}
            className={cx(css.entry, css[insight.type])}
          >
            {glyph && <Icon glyph={glyph} className={css.icon} />}
            <span>{text}</span>
          </FlexStack>
        );
      })}
    </Stack>
  );
};
