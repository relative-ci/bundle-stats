import chunk from 'lodash/chunk';

import COLORS from '../chart-colors.json';

export function getColors(count = 2) {
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
}
