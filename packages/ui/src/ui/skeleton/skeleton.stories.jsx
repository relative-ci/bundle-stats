import React from 'react';

import { Skeleton } from '.';

export default {
  title: 'UI/Skeleton',
  component: Skeleton,
}

export const MultipleTextLines = () => (
  <>
    <Skeleton as="h1" style={{ outline: '1px solid magenta' }} />
    <Skeleton as="h2" style={{  outline: '1px solid magenta' }} />
    <Skeleton as="p" style={{ outline: '1px solid magenta' }} />
    <Skeleton style={{ outline: '1px solid pink' }} />
  </>
);

export const Block = () => (
  <div style={{ outline: '1px solid magenta' }}>
    <Skeleton as="div" block />
  </div>
);
