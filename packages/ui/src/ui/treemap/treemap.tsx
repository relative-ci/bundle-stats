import React from 'react';
import { treemap } from 'd3';

interface TreemapProps {
  data: any;
}

export const Treemap = ({ data }: TreemapProps & React.ComponentProps<'div'>) => {

  const res = treemap(data);

  console.info(res());

  return (
    <svg width="100%">
    </svg>
  );
}
