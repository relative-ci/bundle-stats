import merge from 'lodash/merge';

import { extractCategoryScores } from './category-scores';
import { extractScoreCategoryScores } from './score-category-scores';
import { extractAudits } from './audits';

const extractFns = [
  extractCategoryScores,
  extractScoreCategoryScores,
  extractAudits,
];

export const extract = (webpackStats, baseline) => extractFns.reduce((agg, extractFn) => merge(
  {},
  agg,
  extractFn(webpackStats, agg, baseline),
), {});
