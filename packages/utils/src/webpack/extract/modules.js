import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { getModuleName } from '../utils';

/*
 * Extract webpack modules array to an object with metrics
 */
export const extractModules = (webpackStats = {}) => {
  const modulesSource = get(webpackStats, 'modules', []);

  if (!modulesSource) {
    return { modules: {} };
  }

  // Flatten concatenated modules
  const allModules = modulesSource.reduce((agg, moduleEntry) => {
    if (!moduleEntry.modules) {
      return [...agg, moduleEntry];
    }

    return [
      ...agg,
      ...moduleEntry.modules.map((concatenatedModule) => ({
        ...concatenatedModule,
        // Add parent chunks
        chunks: moduleEntry.chunks,
      })),
    ];
  }, []);

  // Extracted modules
  const modulesByChunk = allModules.reduce((agg, moduleEntry) => {
    const { name, size, chunks } = moduleEntry;
    const normalizedName = getModuleName(name);

    // skip modules with no chunks
    if (isEmpty(chunks)) {
      return agg;
    }

    return {
      ...agg,
      [normalizedName]: {
        name,
        value: size,
        chunkIds: chunks,
      },
    };
  }, {});

  return {
    metrics: {
      modules: modulesByChunk,
    },
  };
};
