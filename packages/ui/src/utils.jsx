import React from 'react';
import { chunk } from 'lodash';
import cx from 'classnames';

import COLORS from './chart-colors.json';

export const getColors = (count = 2) => {
  const chunks = chunk(COLORS, Math.round(COLORS.length / count));

  return chunks.map((chunkColors, index) => {
    if (index === 0) {
      return chunkColors[0];
    }

    if (index === chunks.length - 1) {
      return chunkColors[chunkColors.length - 1];
    }

    return chunkColors[Math.floor(chunkColors.length / 2)];
  });
};

export const getRenderChildWithClassName = (className) => (child) => {
  if (child === null || child === '') {
    return null;
  }

  if (!child?.props) {
    return <div className={className}>{child}</div>;
  }

  return React.cloneElement(child, {
    ...child.props,
    className: cx(className, child.props.className),
  });
};
