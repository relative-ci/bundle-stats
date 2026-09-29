import React from 'react';

import { FlexStack } from '../../layout';
import { FlexStackProps } from '../../layout/flex-stack';

export type MetricsTableRowCountProps = {
  count: number;
  total: number;
} & FlexStackProps<'span'>;

export const MetricsTableRowCount = (props: MetricsTableRowCountProps) => {
  const { count, total, ...restProps } = props;

  return (
    <FlexStack inline gap="xxxsmall" alignItems="bottom" {...restProps}>
      <span>{count}</span>
      <span>/</span>
      <span>{total}</span>
    </FlexStack>
  );
};
