import React from 'react';
import { chunk } from 'lodash';
import cx from 'classnames';
import { FILE_TYPES } from '@bundle-stats/utils';

import { ASSET_ENTRY_TYPE, ASSET_FILE_TYPE, ASSET_FILTERS } from './constants';
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
  if (child === null) {
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

export const getAssetFileTypeFilters = (value = true) =>
  FILE_TYPES.reduce(
    (agg, fileTypeFilter) => ({
      ...agg,
      [`${ASSET_FILE_TYPE}.${fileTypeFilter}`]: value,
    }),
    {},
  );

export const getAssetEntryTypeFilters = (value = true) =>
  [ASSET_FILTERS.ENTRY, ASSET_FILTERS.INITIAL, ASSET_FILTERS.CHUNK, ASSET_FILTERS.ASSET].reduce(
    (agg, entryTypeFilter) => ({
      ...agg,
      [`${ASSET_ENTRY_TYPE}.${entryTypeFilter}`]: value,
    }),
    {},
  );
