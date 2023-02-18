import React from 'react';
import { JobInsightsInfo, getInsightList } from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { ComponentLink } from '../component-link';
import { InsightIcon } from '../insight-icon';
// @ts-ignore
import css from './insights.module.css';

interface InsightsProps extends React.HTMLAttributes<HTMLDivElement> {
  insights: JobInsightsInfo;
  customComponentLink?: React.ElementType;
}

export const Insights = (props: InsightsProps) => {
  const {
    insights,
    customComponentLink: CustomComponentLink = ComponentLink,
    ...restProps
  } = props;

  const insightList = getInsightList(insights);

  return (
    <Stack space="xxsmall" {...restProps}>
      {insightList.map(({ name, insight, link }) => {
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
