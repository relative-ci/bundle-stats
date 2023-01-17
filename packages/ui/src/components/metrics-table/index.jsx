import React, { useState } from 'react';

import { MetricsTable as BaseComponent } from './metrics-table';

export const MetricsTable = (props) => {
  const [showAllItems, setShowAllItems] = useState(false);

  return (
    <BaseComponent {...props} showAllItems={showAllItems}  setShowAllItems={setShowAllItems} />
  );
};
