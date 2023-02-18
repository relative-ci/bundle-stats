import React from 'react';
import { getInsightList } from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { ComponentLink } from '../component-link';
import { InsightIcon } from '../insight-icon';
// @ts-ignore
import css from './insights.module.css';

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

  const insights = getInsightList({ duplicatePackages, newPackages });

  return (
    <Stack space="xxsmall" {...restProps}>
      {insights.map(({ name, insight, link }) => {
        const { text } = insight.data as { text: string };
        return (
          <FlexStack
            key={name}
            space="xxsmall"
            alignItems="center"
            as={CustomComponentLink}
            {...link}
            className={css.entry}
          >
            <InsightIcon type={insight.type} className={css.icon} />
            <span>{text}</span>
          </FlexStack>
        );
      })}
    </Stack>
  );
};
