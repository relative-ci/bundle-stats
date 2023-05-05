import React, { useEffect } from 'react';
import cx from 'classnames';
import { ResponsiveTreeMap } from '@nivo/treemap';

import css from './metrics-tree-map.module.css';

interface Item {
  key: string;
  runs: Array<{
    value?: number;
    delta: number;
  }>;
}

interface TreeMapData {
  id: string;
  color?: string;
  item?: Item;
  children: Array<any>;
}

const getItemColor = (delta: number) => {
  if (delta < 0) {
    return 'hsl(120, 38%, 97%)';
  }

  if (delta > 0) {
    return 'hsl(353, 67%, 98%)';
  }

  return 'hsl(240, 14%, 97%)';
};

const getTreeMapData = (items: Array<Item>): TreeMapData => {
  const treeMapData = {
    id: 'root',
    children: [] as Array<any>,
  };

  items.forEach((item) => {
    const value = Math.max(...item.runs.map((run) => run?.value || 0));

    const node = {
      id: item.key,
      value,
      color: getItemColor(item.runs[0]?.delta),
      item,
    };

    treeMapData.children.push(node);
  });

  return treeMapData;
};

interface MetricsTreeMapProps {
  items: Array<Item>;
}

export const MetricsTreeMap = (props: MetricsTreeMapProps & React.ComponentProps<'div'>) => {
  const { className = '', items, ...restProps } = props;

  const treeMapData = getTreeMapData(items);

  return (
    <div className={cx(css.root, className)} {...restProps}>
      <div className={css.chart}>
        <ResponsiveTreeMap
          data={treeMapData}
          colorBy="color"
          labelSkipSize={12}
          parentLabelSize={24}
          parentLabelPadding={8}
          label="id"
          orientLabel={false}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.2]],
          }}
          parentLabelPosition="top"
          parentLabelTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2], ['opacity', 0.6]],
          }}
        />
      </div>
    </div>
  );
};
