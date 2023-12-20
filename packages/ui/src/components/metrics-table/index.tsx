import React, { useState } from 'react';

import { MetricsTable as BaseComponent } from './metrics-table';

type MetricsTableProps = Omit<
  React.ComponentProps<typeof BaseComponent>,
  'showAllItems' | 'setShowAllItems'
>;

export const MetricsTable = (props: MetricsTableProps) => {
  const [showAllItems, setShowAllItems] = useState(false);

  return <BaseComponent {...props} showAllItems={showAllItems} setShowAllItems={setShowAllItems} />;
};
