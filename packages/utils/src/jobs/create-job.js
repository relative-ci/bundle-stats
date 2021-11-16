import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

import { SOURCE_PATHS } from '../config';
import { createSummary } from './create-summary';
import * as webpack from '../webpack';
import * as lighthouse from '../lighthouse';
import * as browsertime from '../browsertime';

const SOURCE_FNS = { webpack, lighthouse, browsertime };
const GENERIC_PROPS = ['meta', 'insights', 'metrics'];

/*
 * Create job from stats
 */
export const createJob = (source, baseline, options = {}) => SOURCE_PATHS.reduce((agg, sourcePath) => {
  const rawData = get(source, sourcePath);

  if (!rawData) {
    return agg;
  }

  const sourceModule = SOURCE_FNS[sourcePath];

  if (!sourceModule) {
    return agg;
  }

  const extractedData = sourceModule.extract(rawData, baseline, options[sourcePath]);
  const summary = createSummary(
    SOURCE_FNS[sourcePath].SUMMARY_METRIC_PATHS,
    get(baseline, `metrics.${sourcePath}`, {}),
    get(extractedData, 'metrics', {}),
  );

  return merge(
    {},
    agg,
    { rawData: set({}, sourcePath, rawData) },
    { summary: set({}, sourcePath, summary) },
    ...GENERIC_PROPS.map((genericPropName) => ({
      [genericPropName]: set({}, sourcePath, extractedData[genericPropName]),
    })),
  );
}, {});
